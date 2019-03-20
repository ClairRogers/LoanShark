let router = require('express').Router()
let Users = require('../models/User.js')


//GET current logged in user, finds user where the session UID matches the user _id which is set in Auth
router.get('/', (req, res, next) => {
  Users.find({ _id: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

let cache = [] // this is where we store the users
let lastCache = Date.now()
let cacheLife = 60000000 // you might want to adjust this
let nextCache = lastCache + cacheLife

function getCachedUser() {
  return new Promise((resolve, reject) => {
    if (Date.now() < nextCache && cache.length > 0) {
      // find all the users again
      return resolve(cache)
    }
    Users.find().then(users => {
      cache = users
      lastCache = Date.now()
      nextCache = lastCache + cacheLife
      resolve(cache)
    })
  })
}


router.get('/search/:input', (req, res, next) => {
  let query = req.params.input

  getCachedUser().then(users => {
    let data = cache.filter(u => u.name.includes(query) || u.email.includes(query))
    res.send(data)
  })



  // Users.find({
  //   $or: [
  //     { email: { "$regex": eval, "$options": "i" } },
  //     { name: { "$regex": eval, "$options": "i" } }
  //   ]
  // })
  //   .then(data => {
  //     let users = data.map(d => {
  //       d.hash = ''
  //       return d
  //     })
  //     res.send(users)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     next()
  //   })
})



//Get by ID for "view profile" on click; on click sends ID, finds user with that id. can be used to set "active profile"
//or something like that when looking at other people's profiles.
router.get('/:id', (req, res, next) => {
  Users.findById(req.params.id)
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
// router.post('/', (req, res, next) => {
//   req.body.authorId = req.session.uid
//   req.body.collaborators = [{ name: req.session.name, userId: req.session.uid }]
//   Users.create(req.body)
//     .then(newuser => {
//       res.send(newuser)
//     })
//     .catch(err => {
//       console.log(err)
//       next(err)
//     })
// })

//PUT takes in user._id as a parameter, finds user's info, checks that it's the same as the session ID; if yes, update object, if no then access denied. When we do user ratings at the end of loan agreements, the onclick 
router.put('/:id', (req, res, next) => {

  if (req.params.id.toString() == req.session.uid.toString()) {
    Users.findOneAndUpdate({ _id: req.session.uid }, req.body, { new: true })
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        console.log(err)
        next()
      })
  }
  else {
    Users.findById(req.params.id)
      .then(user => {
        let found = user.score.find(s => s.provider == req.session.uid)
        if (found) {
          user.score[user.score.indexOf(found)].rating = req.body.score
          user.markModified('score')
        }
        else {
          let newRating = {
            provider: req.session.uid,
            rating: req.body.score
          }
          user.score.push(newRating)
        }
        user.save(err => {
          if (err) {
            console.log(err)
            next()
            return
          }
          user.hash = ''
          res.send(user)
        })
          //make sure you remove hash on front end

          .catch(err => {
            console.log(err)
            next()
          })
      })
  }
})
// Users.findById(req.params.id)
//   .then(user => {
//     if (!user._id.equals(req.session.uid)) {
//       return res.status(401).send("ACCESS DENIED!")
//     }
//     if (user._id == req.body._id) {
//       user.update(req.body, (err) => {
//         if (err) {
//           console.log(err)
//           next()
//           return
//         }
//         res.send("Successfully Updated")
//         return
//       });
//     }
//   })
//   .catch(err => {
//     console.log(err)
//     next()
//   })


router.delete('/:id', (req, res, next) => {
  //find user
  Users.findByIdAndRemove({ _id: req.params.id })
    .then(user => {
      //if user id is not the person who is logged in then send error
      if (!user._id.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      //otherwise delete user from server
      user.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send('successfully deleted')
      })
    })
})

module.exports = router
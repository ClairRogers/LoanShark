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

router.get('/search/:input', (req, res, next) => {
  let eval = req.params.input
  Users.find({
    $or: [
      { email: eval },
      { name: eval }
    ]
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log('fuck')
      next()
    })
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

  if (req.params.id == req.session.uid) {
    Users.findById(req.params.id)
      .then(user => {
        user.update(req.body, (err) => {
          if (err) {
            console.log(err)
            next()
            return
          }
          res.send(user)
        })
      })
      .catch(err => {
        console.log(err)
        next()
      })
  } else if (req.params.id != req.session.uid) {
    Users.findById(req.params.id)
      .then(user => {
        user.score.push(req.body.score, (err) => {
          if (err) {
            console.log(err)
            next()
            return
          }
          res.send(user)
        })
      })
      .catch(err => {
        console.log(err)
        next()
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
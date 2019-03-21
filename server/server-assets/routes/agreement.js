let router = require('express').Router()
let Users = require('../models/User.js')
let Ags = require('../models/Agreement.js')


//CREATE a new agreement
router.post('/', (req, res, next) => {
  if (req.body.authorId.toString() == req.session.uid.toString()) {
    Ags.create(req.body)
      .then(ag => res.send(ag))
      .catch(err => res.status(400).send(err))
  } else {
    return res.status(401).send("ACCESS DENIED!")
  }
})


//EDIT an in-progress agreement
router.put('/:id', (req, res, next) => {
  if (req.body.lender.toString() == req.session.uid.toString() || req.body.borrower.toString() == req.session.uid.toString()) {
    Ags.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
      .then(ag => {
        res.send(ag)
      })
      .catch(err => {
        console.log(err)
        next()
      })
  }
})


//find all in-progress negotiations with you as lender/borrower
router.get('/negotiations', (req, res, next) => {
  let userAgs = Ags.find({
    $or: [
      { lender: req.session.uid },
      { borrower: req.session.uid }
    ]
  })
  userAgs.find({ agreedUpon: false })
    .then(ags => {
      res.send(ags)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//find all contracts that are currently active/counting down
router.get('/active', (req, res, next) => {
  let userAgs = Ags.find({
    $or: [
      { lender: req.session.uid },
      { borrower: req.session.uid }
    ]
  })
  userAgs.find({
    $and: [
      { agreedUpon: true },
      { closed: false }
    ]
  })
    .then(ags => {
      res.send(ags)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//delete/archive a contract
router.delete('/:id', (req, res, next) => {
  Ags.findById({ _id: req.params.id }
    .then(ag => {

      if (ag.agreedUpon == true && ag.authorId.toString() == req.session.uid.toString()) {
        ag.closed = true
      } else if (ag.lender.toString() == req.session.uid.toString() || ag.borrower.toString() == req.session.uid.toString()) {
        ag.remove(err => {
          if (err) {
            console.log(err)
            next()
            return
          }
          res.send('successfully deleted')
        })
      }
    })
  )
})






module.exports = router
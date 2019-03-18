let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'User'


let schema = new Schema({
  name: { type: String, required: true },
  //every email must be unique on the database
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true }
}, { timestamps: true })

//CASCADE ON DELETE

schema.pre('remove', function (next) {
  //lets find all the lists and remove them
  this._id //THIS IS THE BOARD
  Promise.all([
    //Tasks.deleteMany({ boardId: this._id }),
    Lists.deleteMany({ boardId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})




module.exports = mongoose.model(schemaName, schema)
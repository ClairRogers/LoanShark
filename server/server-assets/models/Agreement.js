let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let agreementSchemaName = 'Agreement'

let term = new Schema({
  authorId: { type: ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  agreedUpon: { type: Boolean, required: true, default: true }
}, { timestamps: true })

let schema = new Schema({
  item: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  closed: { type: Boolean, required: true, default: false },
  terms: [term],
  //to get whole user object use populate mongoose method in agreement routes
  lender: { type: ObjectId, ref: 'User', required: true },
  borrower: { type: ObjectId, ref: 'User', required: true },
  timeRemaining: { type: Number, default: 30 },
  agreedUpon: { type: Boolean, required: true, default: false },
  //if true, in borrower's box, if false in lender's box
  sent: { type: Boolean, required: true, default: false }
}, { timestamps: true })

module.exports = mongoose.model(agreementSchemaName, schema)
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//bcrypt uses hashing and salt to obfiscate your password
let bcrypt = require('bcryptjs')
const SALT = 10

let friend = new Schema({
  name: { type: String, required: true },
  userId: { type: ObjectId, ref: 'User', required: true },
  image: { type: String }
})
let score = new Schema({
  provider: { type: ObjectId, ref: 'User', required: true },
  rating: { type: Number }
})

let schema = new Schema({
  name: { type: String, required: true },
  //every email must be unique on the database
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  image: { type: String }, //possibly look into base64 image encoding
  bio: { type: String },
  paypal: { type: String },
  friends: [friend],
  score: [score]
}, { timestamps: true })


//THESE TWO METHODS CAN BE COPIED FOR ALL USER SCHEMA'S

//statics are used to create Model methods
schema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, SALT)
}

//schema.methods are used to add a method to a Model instance
schema.methods.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.hash, function (err, isMatch) {
      if (err || !isMatch) {
        return reject(err)
      }
      return resolve(isMatch)
    })
  })
}

module.exports = mongoose.model('User', schema)
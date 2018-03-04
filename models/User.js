const mongoose = require('mongoose')

var User = function () {
  const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    zipCode: String
  }, {
    timestamps: true
  })

  return mongoose.model('User', schema)
}

module.exports = new User()

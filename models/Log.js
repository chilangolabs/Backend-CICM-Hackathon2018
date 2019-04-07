const mongoose = require('mongoose')

var Log = function () {
  const schema = new mongoose.Schema({
    error: {
      message: String,
      stack: String
    },
    request: {
      path: String,
      ip: String,
      ips: [],
      headers: {},
      body: {},
      query: {},
      params: {}
    }
  }, {
    timestamps: true
  })

  return mongoose.model('Log', schema)
}

module.exports = new Log()

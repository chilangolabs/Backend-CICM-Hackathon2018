const mongoose = require('mongoose')

module.exports = (url) => {
  mongoose.Promise = Promise
  mongoose.connect(url, { useMongoClient: true })

  const DB = mongoose.connection

  DB.once('open', console.log.bind(console, 'Connected to MongoDB'))
  DB.on('error', console.error.bind(console, 'MongoDB connection error: '))
}

const mongoose = require('mongoose')

/* Constants */
const reportStatuses = require.main.require('./constants/reportStatuses')
// const reportTypes = require.main.require('reportTypes')

var Report = function () {
  const schema = new mongoose.Schema({
    location: [Number],
    folio: String,
    status: {
      type: String,
      enum: reportStatuses,
      default: reportStatuses[0]
    },
    statusNote: {
      type: String,
      default: null
    },
    serviceName: {
      type: String,
      default: null
    },
    serviceCode: Number,
    serviceNote: {
      type: String,
      default: null
    },
    description: String,
    createdAt: {
      type: Date,
      default: new Date()
    },
    updatedAt: Date,
    expectedAt: Date,
    media: String,
    _user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  })

  schema.index({ location: '2dsphere' })

  return mongoose.model('Report', schema)
}

module.exports = new Report()

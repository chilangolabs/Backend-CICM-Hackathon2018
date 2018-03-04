const errors = require.main.require('./constants/errors')
const Log = require.main.require('./models/Log')

module.exports = [
  (err, req, res, next) => {
    if (err instanceof errors.SERVER_ERROR) {
      const log = new Log({
        error: {
          message: err.message,
          stack: err.stack
        },
        request: {
          ip: req.ip,
          ips: req.ips,
          headers: req.headers,
          body: req.body,
          query: req.query,
          params: req.params
        }
      })

      log.save()
    }

    next(err)
  },
  (err, req, res, next) => {
    console.error(err)

    if (!res.headersSent) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message
      })
    }

    next()
  }
]

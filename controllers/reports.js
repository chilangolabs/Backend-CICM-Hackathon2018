const jwt = require('jsonwebtoken')

const errors = require.main.require('./constants/errors')
const Report = require.main.require('./models/Report')

module.exports = (router) => {
  router.route('/')
    .get(async (req, res, next) => {
      try {
        const token = req.headers['authorization'] || null
        let query = {}

        if (token) {
          const decoded = await jwt.decode(token, process.env.JWT_SECRET)
          query._user = decoded._id
        }

        const reports = await Report.find(query).exec()

        res.status(201).json({
          success: true,
          message: 'User resgistered',
          payload: {
            reports
          }
        })
      } catch (err) {
        next(new errors.MONGO_ERROR(err.errmsg))
      }
    })
    .post(async (req, res, next) => {
      // TODO
      try {
        const latitude = req.body.latitude
        const longitude = req.body.longitude
        const description = req.body.description

        if (!latitude || !longitude || !description) {
          return next(new errors.CLIENT_BAD_REQUEST())
        }

        const report = new Report({
          latitude,
          longitude,
          description
        })

        await report.save()

        res.status(201).json({
          success: true,
          message: 'User resgistered',
          payload: {
            report
          }
        })
      } catch (err) {
        next(new errors.MONGO_ERROR(err.errmsg))
      }
    })
}

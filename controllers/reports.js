const errors = require.main.require('./constants/errors')
const Report = require.main.require('./models/Report')

module.exports = (router) => {
  router.route('/')
    .get(async (req, res, next) => {
      try {
        const reports = await Report.find().exec()

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

const firebase = require('firebase-admin')

const errors = require.main.require('./constants/errors')

module.exports = (router) => {
  router.get('/', async (req, res, next) => {
    try {
      const deviceToken = req.query.deviceToken
      const title = req.query.title
      const body = req.query.body

      if (!deviceToken || !title || !body) {
        return next(new errors.CLIENT_BAD_REQUEST())
      }

      const payload = {
        notification: {
          title: req.query.title,
          body: req.query.body
        }
      }

      const notification = await firebase.messaging().sendToDevice(deviceToken, payload)

      res.status(201).json({
        success: true,
        message: 'Notification sent',
        payload: {
          notification
        }
      })
    } catch (err) {
      next(new errors.FIREBASE_ERROR(err.errmsg))
    }
  })
}

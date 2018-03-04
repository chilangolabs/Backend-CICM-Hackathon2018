const jwt = require('jsonwebtoken')

const errors = require.main.require('./constants/errors')
const User = require.main.require('./models/User')

module.exports = (router) => {
  router.post('/signup', async (req, res, next) => {
    try {
      const firstName = req.body.firstName
      const lastName = req.body.lastName
      const email = req.body.email
      const password = req.body.password
      const phone = req.body.phone || null
      const zipCode = req.body.zipCode
      const deviceToken = req.body.deviceToken || null

      if (!firstName || !lastName || !email || !password || !zipCode) {
        return next(new errors.CLIENT_BAD_REQUEST())
      }

      const user = new User({
        firstName,
        lastName,
        email,
        password,
        phone,
        zipCode,
        deviceToken
      })

      await user.save()

      const token = await jwt.sign({ _id: user._id, role: 'user' }, process.env.JWT_SECRET)

      res.status(201).json({
        success: true,
        message: 'User resgistered',
        payload: {
          user,
          token
        }
      })
    } catch (err) {
      next(new errors.MONGO_ERROR(err.errmsg))
    }
  })

  router.post('/signin', async (req, res, next) => {
    try {
      const email = req.body.email
      const password = req.body.password

      if (!email || !password) {
        return next(new errors.CLIENT_BAD_REQUEST())
      }

      const user = await User.findOne({ email })

      // TODO

      const token = await jwt.sign({ user: user._id }, process.env.JWT_SECRET)

      res.status(200).json({
        success: true,
        message: 'User logged',
        payload: {
          token
        }
      })
    } catch (err) {
      next(new errors.MONGO_ERROR(err.errmsg))
    }
  })
}

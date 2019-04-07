const jwt = require('jsonwebtoken')
const errors = require.main.require('./constants/errors')

let authMiddleware = (role) => {
  return async (req, res, next) => {
    const accessToken = req.headers['authorization']

    if (!accessToken || !role) {
      return next(new errors.CLIENT_UNAUTHORIZED())
    }

    try {
      const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET)

      if (!Array.isArray(role)) {
        role = [role]
      }

      if (!role.includes(decoded.role)) {
        return next(new errors.CLIENT_FORBIDDEN())
      }

      req.user = Object.assign(req.user || {}, decoded)
      next()
    } catch (err) {
      next(new errors.CLIENT_INVALID_TOKEN(err.message))
    }
  }
}

const authAdminMiddleware = authMiddleware('admin')
const authUserMiddleware = authMiddleware('user')

module.exports = { authAdminMiddleware, authUserMiddleware }

const errors = require('errors')

errors.create({
  name: 'CLIENT_ERROR',
  defaultMessage: 'Invalid action, please try again',
  status: 400,
  scope: exports
})

errors.create({
  name: 'CLIENT_UNAUTHORIZED',
  defaultMessage: 'Authentication is required, please try again',
  parent: exports.CLIENT_ERROR,
  status: 401,
  scope: exports
})

errors.create({
  name: 'CLIENT_INVALID_TOKEN',
  defaultMessage: 'Invalid token, please login again',
  parent: exports.CLIENT_ERROR,
  status: 401,
  scope: exports
})

errors.create({
  name: 'CLIENT_FORBIDDEN',
  defaultMessage: 'Not authorized',
  parent: exports.CLIENT_ERROR,
  status: 403,
  scope: exports
})

errors.create({
  name: 'CLIENT_BAD_REQUEST',
  defaultMessage: 'Some parameter are missing',
  parent: exports.CLIENT_ERROR,
  status: 400,
  scope: exports
})

errors.create({
  name: 'SERVER_ERROR',
  defaultMessage: 'An error has ocurred, please try again later',
  defaultExplanation: 'Error at the server',
  status: 500,
  scope: exports
})

errors.create({
  name: 'FIREBASE_ERROR',
  defaultMessage: 'An error has ocurred, please try again later',
  defaultExplanation: 'Error at Firebase',
  parent: exports.SERVER_ERROR,
  status: 500,
  scope: exports
})

errors.create({
  name: 'MONGO_ERROR',
  defaultMessage: 'An error has ocurred, please try again later',
  defaultExplanation: 'An error ocurred at DB',
  parent: exports.SERVER_ERROR,
  status: 500,
  scope: exports
})

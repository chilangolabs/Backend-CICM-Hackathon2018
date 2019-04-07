if (process.env.NODE_ENV !== 'production') require('longjohn')

require('dotenv').config()

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const firebase = require.main.require('./middleware/firebase')
const mongodb = require.main.require('./middleware/mongodb')
let app = express()

mongodb(process.env.MONGO_URL)
firebase()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Services working properly',
    payload: {}
  })
})

function mount (route, path) {
  const router = express.Router({ mergeParams: true })
  require(path)(router)
  app.use(route, router)
}

/* Routes */
mount('/auth', './controllers/auth')
mount('/reports', './controllers/reports')
mount('/testing', './controllers/test')
mount('/telegram', './controllers/ultron')

app.use(require('./middleware/serverError'))

const PORT = process.env.PORT || 1337
app.listen(PORT, function onListen () {
  console.log(`Server listening on http://127.0.0.1:${PORT}`)
})

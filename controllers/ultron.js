const firebase = require('firebase-admin')
const errors = require.main.require('./constants/errors')
const Telegram = require.main.require('./lib/Telegram')
const Report = require.main.require('./models/Report')
let bot = new Telegram(process.env.TELEGRAM_BOT_TOKEN)

var location = {}

module.exports = router => {
  router.post('/', async (req, res, next) => {
    if (req.body.message) {
      let text
      let markdown

      // Command start
      if (req.body.message.entities && Array.isArray(req.body.message.entities)) {
        if (req.body.message.entities.find(entity => entity.type === 'bot_command').length > 0) {
          if (req.body.message.text.includes('start')) {
            // TODO
          } else if (req.body.message.text.includes('new_report')) {
            text = 'Por favor, enviame la ubicación de tu reporte'
          } else {
            text = 'Holi Kalpoli'
          }
        }
      }

      if (req.body.message.location) {
        location = req.body.message.location
        text = '¿Podrías describir tu problematica?'
      } else {
        if (req.body.message.text.toLocaleLowerCase().trim() === 'hay un edificio dañado') {
          const deviceToken = 'ctLUNgm-zSk:APA91bHjNHpFJSB0kb1i7XDHP0TmE9RJK3xyEwyvo-Ig9ccj1i4cRFlVz86rn6H3l7wDLcLrsVI47BLt-KPXenBQJvarcaY23tLtvBDP0TqGCROu3jxY2qHA425jlDgKzfMLhFuf9LAI'
          const payload = {
            notification: {
              title: 'Kalpoli',
              body: 'Nuevo reporte en tu zona'
            }
          }
          const report = new Report({
            latitude: location.latitude,
            longitude: location.longitude,
            description: req.body.message.text
          })

          await report.save()
          await firebase.messaging().sendToDevice(deviceToken, payload)

          text = `Tu reporte ha sido levanta, tu número de folio es ${report.folio}`
        }
      }

      const chatId = req.body.message.chat.id

      try {
        await bot.sendMessage(chatId, text, markdown)
        return res.sendStatus(200)
      } catch (err) {
        next(new errors.TELEGRAM_ERROR())
      }
    }
  })
}

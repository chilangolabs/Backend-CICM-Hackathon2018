const errors = require.main.require('./constants/errors')
const Telegram = require.main.require('./lib/Telegram')
let bot = new Telegram(process.env.TELEGRAM_BOT_TOKEN)

module.exports = router => {
  router.post('/', async (req, res, next) => {
    if (req.body.message) {
      const chatId = req.body.message.chat.id
      let text = 'Holi Kalpoli'

      try {
        await bot.sendMessage(chatId, text)
        return res.sendStatus(200)
      } catch (err) {
        next(new errors.TELEGRAM_ERROR())
      }
    }
  })
}

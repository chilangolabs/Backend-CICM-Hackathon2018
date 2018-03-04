const errors = require.main.require('./constants/errors')
const Telegram = require.main.require('./lib/Telegram')
let bot = new Telegram(process.env.TELEGRAM_BOT_TOKEN)

module.exports = router => {
  router.post('/', async (req, res, next) => {
    if (req.body.message) {
      // Command start
      if (req.body.message.entities && Array.isArray(req.body.message.entities)) {
        if (req.body.message.entities.find(entity => entity.type === 'bot_command').length > 0) {
          if (req.body.message.text.includes('start')) {
            // TODO
          }
        }
      }

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

const request = require('request-promise-native')

class Telegram {
  constructor (token = process.env.TELEGRAM_TOKEN) {
    this.token = token
    this.url = `https://api.telegram.org/bot${this.token}/`
  }

  async _request (path, body) {
    try {
      await request({
        method: 'POST',
        uri: `${this.url}${path}`,
        body,
        json: true
      })
    } catch (err) {
      return err
    }
  }

  sendMessage (chatId, text) {
    const query = {chat_id: chatId, text}

    return this._request('sendMessage', query)
  }

  sendChatAction (chatId, action) {
    const query = {chat_id: chatId, action}

    return this._request('sendChatAction', query)
  }

  sendLocation (chatId, location) {
    const query = {chat_id: chatId, latitude: location[0], longitude: location[1]}

    return this._request('sendLocation', query)
  }

  inlineQuery (queryId, results) {
    const query = {inline_query_id: queryId, results}

    return this._request('answerInlineQuery', query)
  }
}

module.exports = Telegram

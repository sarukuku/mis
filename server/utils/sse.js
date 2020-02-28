const sendEvent = (responder, payload, type = 'message') => {
  if (responder.writable) {
    responder.write(`event: ${type}\n`)
    responder.write(`data: ${JSON.stringify(payload)}\n\n`)
  }
}

const genId = () => {
  return (
    Math.random()
      .toString(36)
      .substr(2, 7) + (+new Date()).toString(32).substr(4, 9)
  )
}

const updateClients = (req, payload, id) => {
  req.app.get('clients').forEach(client => {
    let { _, responder } = client
    let data = {
      payload: payload,
      id: id
    }
    sendEvent(responder, data)
  })
}

module.exports = { sendEvent, genId, updateClients }

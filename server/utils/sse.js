
var sendEvent = (responder, payload, type = "message") => {
    responder.write(`event: ${type}\n`)
    responder.write(`data: ${JSON.stringify(payload)}\n\n`)
};

module.exports = { sendEvent }

var sendEvent = (responder, payload, type = "message") => {
    responder.write(`event: ${type}\n`)
    responder.write(`data: ${JSON.stringify(payload)}\n\n`)
};

var genId = () => {
    return Math.random().toString(36).substr(2, 7) + (+new Date()).toString(32).substr(4, 9)
}

module.exports = { sendEvent, genId }
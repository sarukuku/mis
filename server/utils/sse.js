
var sendEvent = (responder, payload, type = "message") => {
    if (responder.writable) {
        responder.write(`event: ${type}\n`)
        responder.write(`data: ${JSON.stringify(payload)}\n\n`)
    }
};

var genId = () => {
    return Math.random().toString(36).substr(2, 7) + (+new Date()).toString(32).substr(4, 9)
};

var updateClients = (req, payload, type, topic, month, reporter) => {
    req.app.get('clients').forEach(client => {
        let { _, responder } = client

        let data = {
            type: type,
            payload: payload,
            topic: topic,
            month: month,
            reporter: reporter
        }

        sendEvent(responder, data)
    })
};

module.exports = { sendEvent, genId, updateClients}
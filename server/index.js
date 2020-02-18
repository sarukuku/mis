require('dotenv').config()
const express = require('express')
const next = require('next')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const mongoose = require('mongoose')
const { reportRouter, monthRouter, topicRouter } = require('./routes/index')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const { sendEvent} = require('./utils/sse')

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Multi-process to utilize all CPU cores.
if (!dev && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`)
  })
} else {
  const nextApp = next({ dir: '.', dev })
  const handle = nextApp.getRequestHandler()

  nextApp.prepare().then(() => {
    const server = express()

    if (!dev) {
      // Enforce SSL & HSTS in production
      server.use(function(req, res, next) {
        var proto = req.headers['x-forwarded-proto']
        if (proto === 'https') {
          res.set({
            'Strict-Transport-Security': 'max-age=31557600' // one-year
          })
          return next()
        }
        res.redirect('https://' + req.headers.host + req.url)
      })
    }

    var sseClients = []
    server.set('clients', sseClients)

    // Server sent events
    server.get('/stream', (req, res, next) => {
      let newId = Math.random().toString(36).substr(2, 7) + (+new Date()).toString(32).substr(4, 9)
      const client = {
        id: newId,
        responder: res
      }
      server.get('clients').push(client)
      console.log(`${newId} client connected`)

      const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      }
      res.writeHead(200, headers)

      sendEvent(res, { handshake: true })

      req.on('close', () => {
        console.log(`${newId} client dropped`)
        server.set('clients', server.get('clients').filter(c => c.id !== newId))
        res.end()
      })
    })

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.use('/api/report', reportRouter)
    server.use('/api/month', monthRouter)
    server.use('/api/topic', topicRouter)

    server.get('*', (req, res) => {
      return handle(req, res) // react stuff
    })

    server.listen(PORT, err => {
      if (err) {
        throw err
      }
      console.log(`ready at http://localhost:${PORT}`)
    })
  })
}

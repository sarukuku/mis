require('dotenv').config()
const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { genId } = require('./utils/sse')
const passport = require('passport')
const session = require('cookie-session')

const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.APP_HOSTNAME
const dev = process.env.NODE_ENV !== 'production'
const { reportRouter, monthRouter, topicRouter, authRouter } = require('./routes/index')
const shouldAuthenticate = process.env.GOOGLE_AUTH_ENABLED

// Connect to the database.
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

// Configure authentication strategy for Passport.
if (shouldAuthenticate) {
  require('./services/passport')
}

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

  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  if (shouldAuthenticate) {
    server.use(
      session({
        secret: process.env.GOOGLE_AUTH_COOKIE_SECRET,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 30, // month
          secure: !dev
        }
      })
    )
    server.use(passport.initialize())
    server.use(passport.session())
    server.use('/auth', authRouter)

    // Check if the request has a user before allowing further.
    server.use((req, res, next) => {
      if (req.isAuthenticated()) {
        next()
      } else {
        res.redirect('/auth')
      }
    })
  }

  // Keep track of all connected clients
  var sseClients = []
  server.set('clients', sseClients)

  // Server sent events
  server.get('/stream', (req, res, next) => {
    let newId = genId()
    const client = {
      id: newId,
      responder: res
    }
    server.get('clients').push(client)
    console.log(`${newId} client connected`)

    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache'
    }

    res.writeHead(200, headers)

    req.on('close', () => {
      console.log(`Client dropped: ${newId}\nClients remaining: `)
      server.set(
        'clients',
        server.get('clients').filter(c => c.id !== newId)
      )
      console.log(server.get('clients').length)
      res.end()
    })
  })

  server.use('/api/report', reportRouter)
  server.use('/api/month', monthRouter)
  server.use('/api/topic', topicRouter)

  server.get('/', (req, res) => {
    return handle(req, res)
  })

  server.get('*', (req, res) => {
    return handle(req, res) // react stuff
  })

  server.listen(PORT, err => {
    if (err) {
      throw err
    }
    console.log(`ready at ${HOSTNAME}:${PORT}`)
  })
})

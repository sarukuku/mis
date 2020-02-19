require('dotenv').config()
const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const passport = require('passport')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const uid = require('uid-safe')

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
        console.log('redirect to:', req.headers.host, req.url)
        res.redirect('https://' + req.headers.host + req.url)
      })
    }

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    if (shouldAuthenticate) {
      server.use(
        session({
          secret: uid.sync(18),
          cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30, // month
            secure: !dev
          },
          resave: true,
          saveUninitialized: true,
          store: new mongoStore({ mongooseConnection: mongoose.connection })
        })
      )
      server.use(passport.initialize())
      server.use(passport.session())
      server.use('/auth', authRouter)

      // Check if the request has a user before allowing further.
      server.use((req, res, next) => {
        console.log('isAuthenticated?', req.isAuthenticated())
        console.log('req.sess:', req.session)
        if (req.isAuthenticated()) {
          next()
        } else {
          res.redirect('/auth')
        }
      })
    }

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
}

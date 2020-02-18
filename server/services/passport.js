const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const allowedDomain = process.env.GOOGLE_AUTH_ALLOWED_DOMAIN
const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const port = process.env.PORT

passport.use(
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: `http://localhost:${port}/auth/callback`
    },
    (accessToken, refreshToken, profile, callback) => {
      // Logic to check if it's really a reaktor user
      if (profile._json.hd !== allowedDomain) {
        return callback(null, false, { message: 'Authentitcation failed' })
      }

      return callback(null, profile)
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  cb(null, user)
})

const express = require('express')
const router = express.Router()
const passport = require('passport')

const destroySession = (req, res) => {
  req.session.destroy(() => {
    req.logout()
    res.redirect('/auth')
  })
}

// Login.
router.get('/', passport.authenticate('google', { scope: ['email'], prompt: 'select_account' }))

// Callback after login is done at Google's end.
router.get('/callback', passport.authenticate('google', { failureRedirect: '/auth' }), (req, res) => res.redirect('/'))

// Logout.
router.get('/logout', destroySession)

module.exports = router

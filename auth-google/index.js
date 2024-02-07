//npm install express ejs express-session
//passport passport-google-oauth --save
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const GoogleConnect = require('passport-google-oauth').OAuth2Strategy

const app = express()

//Config sessions
app.use(
  session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
  })
)

//Initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.set('views', './views')

//Config Routes
app.get('/', (req, res) => {
  res.render('public/auth')
})

//Route of granted access
app.get('/home', (req, res) => {
  res.render('public/home', { user: req.user })
})

//Config of Google session
passport.use(
  new GoogleConnect(
    {
      clientID:
        '478510298550-0osacstqhiauks26dpq2vofpfkr63i5a.apps.googleusercontent.com',
      clientSecret: '',
      callback: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile)
    }
  )
)

//Serialization and des-serialization
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

//Routes for auth Google
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    res.redirect('/home')
  }
)

const PORT = 3000
const HOST = 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`Server run on http://${HOST}:${PORT}`)
})

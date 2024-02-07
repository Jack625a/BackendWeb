const passport = require('passport')
const Facebook = require('passport-facebook-oauth').Strategy
const User = require('./models/user')

passport.use(
  new Facebook(
    {
      clientID: '',
      clientSecret: '',
      callbackURL: 'http://localhost:3000/login/callback',
      profileFields: ['id', 'email', 'name'],
    },
    async function (accessToken, refreshToken, profile, done) {
      const id = profile.id
      const name = profile.displayName
      const email = profile.email[0].value
      try {
        let user = await User.findOne({ facebookId: id })

        if (!user) {
          user = new User({ facebookId: id, name: name, email: email })
          await user.save()
          console.log('Datos guardados.')
        }
        done(null, profile)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

const passport=require('passport');
const Facebook=require('passport-facebook').Strategy;
const User=require('./models/user');


passport.use(
    new Facebook(
      {
        clientID:'',
        clientSecret:'',
        callbackURL:"http://localhost:3000/login/callback",
        profileFields:['id','email','name']
      },
      async function (accessToken, refreshToken, profile, cb) {
        const user = await User.findOne({
          accountId: profile.id,
          provider: 'facebook',
        });
        if (!user) {
          console.log('Adding new facebook user to DB..');
          const user = new User({
            accountId: profile.id,
            name: profile.displayName,
            provider: profile.provider,
          });
          await user.save();
          // console.log(user);
          return cb(null, profile);
        } else {
          console.log('Facebook User already exist in DB..');
          // console.log(profile);
          return cb(null, profile);
        }
      }
    )
  );

//Configuracion de la serializacion y desarializacion
passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(obj,done){
    done(null,obj);
});
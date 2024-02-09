const passport=require('passport');
const Github=require('passport-github2').Strategy;
const User=require('./models/user');
const Facebook=require('passport-facebook').Strategy;
const Google=require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();


passport.use(new Github({
    clientID:process.env.APPID_GITHUB,
    clientSecret:process.env.APPSECRET_GITHUB,
    callbackURL:'http://localhost:3000/auth/github/callback',
},
async function(accessToken,refreshToken,profile,done){
    const id=profile.id;
    const name=profile.username;

    try{
        let user=await User.findOne({accountId:id, provider:'github'});

        if(!user){
            user=new User({accountId:id,name,provider:'github'});
            await user.save();
        }
        done(null,profile);

    }catch(error){
        done(error);
    }
}
));

//Serializacion y desearializacion
passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(obj,done){
    done(null,obj);
});
import passport from 'passport';
const FacebookStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
import dotenv from 'dotenv';
import { Application } from 'express';
import session from 'express-session';

dotenv.config();

class Passport {
  public static init(app: Application): Application {
    console.log('Configuring passport...');
    
    app.use(session({secret: process.env.SESSION_SECRET as string || "secret", resave: false, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((obj:string, done) => {
      done(null, obj);
    });
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID as string,
        clientSecret: process.env.FACEBOOK_APP_SECRET as string,
        fbGraphVersion: 'v3.0'
      },
      function(accessToken:any, refreshToken:any, profile:any, done:any) {
        // console.log(profile);
        return done(null, profile);
      }
    ));
    passport.use(
      new GoogleTokenStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        function(accessToken:any, refreshToken:any, profile:any, done:any) {
          // console.log(profile);
          return done(null, profile);
        }
      )
    );
    return app;
  }
}

export default Passport;

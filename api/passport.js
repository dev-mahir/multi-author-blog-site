mport passport from "passport";
import { Strategy } from "passport-google-oauth2";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "884295295890-9opbuvnbj98r83mp0ft6jcie1nqs8o6g.apps.googleusercontent.com", // Your Credentials here.
      clientSecret: "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", // Your Credentials here.
      callbackURL: "http://localhost:5050/auth/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

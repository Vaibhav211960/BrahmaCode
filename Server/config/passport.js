import passport from "passport";
import dotenv from "dotenv";
dotenv.config({ override: true });
import GoogleStrategy from "passport-google-oauth20";
import Athlete  from '../models/athlete.model.js'
import Coach from '../models/coach.model.js'

passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true // <<-- ensure `req` is passed to the verify callback
},
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const userType = req.session?.userType;
            const Model = userType === 'coach' ? Coach : Athlete;

            let existingUser = await Model.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }

            const email = profile.emails && profile.emails[0] && profile.emails[0].value;
            const photo = profile.photos && profile.photos[0] && profile.photos[0].value;

            if (!existingUser && email) {
                existingUser = await Model.findOne({ email });
                if (existingUser) {
                    existingUser.googleId = profile.id;
                    await existingUser.save();
                    return done(null, existingUser);
                }
            }

            const generatedUsername = (profile.displayName || email?.split('@')[0] || `user${Math.floor(Math.random()*1000)}`).replace(/\s+/g, '').toLowerCase();

            const newUser = await Model.create({
                googleId: profile.id,
                name: profile.displayName || generatedUsername,
                username: generatedUsername,
                email: email || undefined,
                password: undefined,
                profile_img: photo || undefined
            });

            return done(null, newUser);
        } catch (err) {
            return done(err, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, { id: user._id });
});

passport.deserializeUser(async (obj, done) => {
    try {
        let user = await Athlete.findById(obj.id);
        if (!user) user = await Coach.findById(obj.id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport
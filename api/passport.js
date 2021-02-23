const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Marsupilami = mongoose.model('Marsupilami');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        function(username, password, done) {
            Marsupilami.findOne({ email: username }, function(err, marsupilami) {
                if (err) {
                    return done(err);
                }
                if (!marsupilami) {
                    return done(null, false, {
                        message: 'Marsupilami non trouvé'
                    });
                }
                if (!marsupilami.validPassword(password)) {
                    return done(null, false, {
                        message: 'Mot de passe incorrect'
                    });
                }
                return done(null, marsupilami);
            });
        }
    )
);

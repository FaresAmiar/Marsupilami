const mongoose = require('mongoose');
const passport = require('passport');
const Marsupilami = require('../modeles/marsupilami');

module.exports.inscription = (req, res) => {
    const marsupilami = new Marsupilami();

    marsupilami.nom = req.body.nom;
    marsupilami.email = req.body.email;
    marsupilami.age = req.body.age;
    marsupilami.famille = req.body.famille;
    marsupilami.race = req.body.race;
    marsupilami.nourriture = req.body.nourriture;

    marsupilami.setPassword(req.body.password);

    marsupilami.save(() => {
        const token = marsupilami.genererJWT();
        res.status(200);
        res.json({
            token: token
        });
    });
};

module.exports.connexion = (req, res) => {
    console.log(req.body);
    passport.authenticate('local', (err, marsupilami, info) => {
        if (err) {
            res.status(404).json(err);
            return;
        }

        if (marsupilami) {
            const token = marsupilami.genererJWT();
            res.status(200);
            res.json({
                token: token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

const mongoose = require('mongoose');
const Marsupilami = mongoose.model('Marsupilami');
const Ami = mongoose.model('Ami');

module.exports.profileRead = (req, res) => {
    if (!req.payload._id) {
        res.status(401).json({
            message: 'Erreur : profil privé'
        });
    } else {
        Marsupilami.findById(req.payload._id).exec(function(err, marsupilami) {
            res.status(200).json(marsupilami);
        });
    }
};

module.exports.getAmis = (req, res) => {
    if (!req.payload._id) {
        res.status(401).json({
            message: 'Erreur : profil privé'
        });
    } else {
        Ami.findById(req.payload._id).populate('ami',['nom','email','age','famille','race','nourriture'])
            .then(amis => {
                if(!amis) {
                    res.status(404).json({
                        message: 'Erreur : pas d\'amis :('
                    });
                } else {
                    res.status(200).json(amis);
                }
            })
    }
};

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const marsupilamiSchema = new mongoose.Schema({
    email: {
        type: String,
        unique : true,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    age : {
        type : Number,
        required : true
    },
    famille : {
        type : String,
        required : true
    },
    race : {
        type : String,
        required : true
    },
    nourriture : {
        type : String,
        required : true
    },
    hash: String,
    salt: String
});

marsupilamiSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

marsupilamiSchema.methods.validPassword = function(password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

marsupilamiSchema.methods.genererJWT = function() {
    const dateExp = new Date();
    dateExp.setDate(dateExp.getDate() + 15);

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            nom: this.nom,
            age: this.age,
            famille: this.famille,
            race: this.race,
            nourriture: this.nourriture,
            exp: parseInt(dateExp.getTime() / 1000)
        },
        'le-secret-du-marsupilami-et-de-ses-amis'
    );
};

const Marsupilami = mongoose.model('Marsupilami', marsupilamiSchema);
module.exports = Marsupilami;

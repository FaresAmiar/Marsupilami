const authentification = require('../controleurs/authentification');
const profile = require('../controleurs/profile');
const jwt = require('express-jwt');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const auth = jwt({
    secret: 'le-secret-du-marsupilami-et-de-ses-amis',
    userProperty: 'payload',
    algorithms : ['HS256']
});

router.get('/profile', auth, profile.profileRead);

//router.post('/profile', auth);
router.get('/getAmis', auth, profile.getAmis);

router.post('/inscription', authentification.inscription);

router.post('/connexion', authentification.connexion);

module.exports = router;


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const app = express();
const routesApi = require('./api/routes/index.js');

require('./api/modeles/bdd');
require('./api/passport');

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/api',routesApi);

app.get('*',(req,res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, ()=>{
    console.log("Serveur en route");
});

require('./marsupilami');
require('./ami');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://<username>:<password>@cluster0.gmefa.mongodb.net/Marsupilami?retryWrites=true&w=majority';

mongoose.set('useCreateIndex', true);
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connecté`);
});
mongoose.connection.on('error', (err) => {
    console.log(`Mongoose erreur de conenxion: ${err}`);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose déconnecté');
});

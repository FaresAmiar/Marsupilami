const mongoose = require('mongoose');

const amiSchema = new mongoose.Schema({
   marsupilami : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'Marsupilami'
   },
   ami : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'Marsupilami'
   }
});

const Ami = mongoose.model('Ami', amiSchema);
module.exports = Ami;

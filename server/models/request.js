const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RequestSchema = new Schema({
    description: String,
    phone: String,
});

module.exports = mongoose.model('Request', RequestSchema);
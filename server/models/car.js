const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const CarSchema = new Schema({
    carName: String,
    carFull: String,
    make: String,
    model: String,
    year: String, 
    mileage: String,
    imgs: [ImageSchema],
    price: String,
    location: String,
    transmission: String,
    condition: String,
    bodyType: String,
    color: String, 
    fuel: String,
    engineSize: String,
    interiorType: String,
    phoneNumber: String,
    yardName: String,
    videoLink: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Car', CarSchema);
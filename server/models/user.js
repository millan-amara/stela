const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    sName: String,
    phone: String,
    isAdmin: {
        type: Boolean,
        default: 'false'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', UserSchema);
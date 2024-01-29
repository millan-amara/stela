const User = require('../models/user');
const Car = require('../models/car');


module.exports.register = async (req, res) => {
    try {
        const {email, sName, phone, password} = req.body;
        const user = new User({
            email: email,
            phone: phone,
            sName: sName,
        });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            res.json(registeredUser)
        })
        console.log(registeredUser)
    } catch(e) {
        console.log(e)
    }
}

module.exports.loggedIn = async (req, res) => {
    const user = req.user;
    
    res.json(user)
}

module.exports.logout = async (req, res) => {
    req.logout((err) => {
        if(err) { return next(err)}
    });
}

//get Cars belonging to a particular user
module.exports.fetchUserCars = async (req, res) => {
    const id = req.user._id;
    const cars = await Car.find().where('author').equals(id).exec();
    res.json(cars)
}

module.exports.fetchAllCars = async (req, res) => {
    const cars = await Car.find({});
    res.json(cars)
}

module.exports.updateUser = async (req, res) => {
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, req.body)

    await user.save();
}




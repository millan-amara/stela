const ExpressError = require('./utils/ExpressError');
const User = require('./models/user');
const Car = require('./models/car');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
    next();
}

module.exports.isAdmin = async (req, res, next) => {
    const id = req.user._id;
    const user = await User.findById(id);
    if(!user.isAdmin) {
        return res.json({error: "Access denied!"});
    }

    next();
}

module.exports.isAuthor = async (req, res, next) => {
    try{
    const { id } = req.params;
    const car = await Car.findById(id);
    const user = await User.findById(req.user._id);
    if (!car.author.equals(req.user._id) && !user.isAdmin) {
        return console.log({error: "No permission to do that"});
    }
    next();
} catch (e) {
    console.log(e)
}
}
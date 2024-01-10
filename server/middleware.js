const User = require('./models/user');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
    next();
}

// module.exports.isAdmin = async (req, res, next) => {
//     const id = req.user._id;
//     const user = await User.findById(id);
//     if(!user.isAdmin) {
//         return res.redirect('/vpm/tool-app/jobs');
//     }
//     next();
// }

// module.exports.isAuditor = async (req, res, next) => {
//     const id = req.user._id;
//     const user = await User.findById(id);
//     if(!user.isAuditor) {
//         return res.redirect('/vpm/tool-app/jobs');
//     }
//     next();
// }

// module.exports.isActive = async (req, res, next) => {
//     const id = req.user._id;
//     const user = await User.findById(id);
//     if(!user.activeStatus) {
//         return res.redirect('/vpm/tool-app/jobs');
//     }
//     next();
// }

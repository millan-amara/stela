const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const { isLoggedIn } = require('../middleware');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage }); 

router.route('/register')
    .post(users.register);

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
    }));

router.get('/logged-in', users.loggedIn);

router.get('/logout', isLoggedIn, users.logout);

router.get('/fetchusercars', isLoggedIn, users.fetchUserCars)

router.put('/users/:id', isLoggedIn, users.updateUser);

// router.get('/forgot', users.renderForgot);
// router.post('/forgot', users.forgot);
// router.get('/reset/:token', users.renderReset);
// router.post('/reset/:token', users.reset); 

// router.get('/qa/users', isLoggedIn, isAuditor, users.getUsers);
// router.get('/qa/users/:id/specific', isLoggedIn, isAuditor, users.getSpecificUser);
// router.put('/qa/users/:id/specific', isLoggedIn, isAuditor, users.updateSpecificUser);
// router.get('/qa/users/:id', isLoggedIn, isAuditor, users.reviewShow);

// //USER PROFILE
// router.get('/users/:id/profile', isLoggedIn, users.profile);
// router.put('/users/:id/profile', isLoggedIn, users.postPayment);



// //admin panel
// router.get('/users/admin/controlpanel', isLoggedIn, isAdmin, users.getControlPanel);
// router.get('/users/:id', isLoggedIn, isAdmin, users.getEdit);


module.exports = router;
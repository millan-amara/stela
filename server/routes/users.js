const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const { isLoggedIn } = require('../middleware');


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


module.exports = router;
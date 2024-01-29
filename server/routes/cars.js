const express = require('express');
const router = express.Router();
const cars = require('../controllers/cars');
const { isLoggedIn, isAdmin, isAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });



router.route('/index')
    .post([isLoggedIn, isAdmin, upload.array('files')], cars.createCar);

router.route('/index/search')
    .post(cars.getSearchCars)

router.put('/:id/update', isLoggedIn, isAuthor, catchAsync(cars.updateImages));

router.route('/:id')
    .get(catchAsync(cars.showCar))
    .put([isLoggedIn, isAuthor, upload.array('files')], catchAsync(cars.updateCar))
    .delete(isLoggedIn, isAuthor, catchAsync(cars.deleteCar));


module.exports = router;
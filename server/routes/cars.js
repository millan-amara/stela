const express = require('express');
const router = express.Router();
const cars = require('../controllers/cars');
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });



router.route('/index')
    .get(cars.getCars)
    .post([isLoggedIn, upload.array('files')], cars.createCar);

router.route('/index/search')
    .post(cars.getSearchCars)

router.put('/:id/update', isLoggedIn, catchAsync(cars.updateImages));

router.route('/:id')
    .get(catchAsync(cars.showCar))
    .put([isLoggedIn, upload.array('files')], catchAsync(cars.updateCar))
    .delete(isLoggedIn, catchAsync(cars.deleteCar));


module.exports = router;
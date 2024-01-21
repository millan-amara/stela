const express = require('express');
const router = express.Router();
const requests = require('../controllers/requests');


router.route('/index')
    .get(requests.fetchRequests)
    .post(requests.createRequest);


module.exports = router;
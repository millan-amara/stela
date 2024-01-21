const Request = require('../models/request');


module.exports.createRequest = async (req, res) => {
    const request = new Request(req.body);

    await request.save();
    console.log(request);
    return res.json('success');
}

module.exports.fetchRequests = async (req, res) => {
    const requests= await Request.find({});
    res.json(requests);
}
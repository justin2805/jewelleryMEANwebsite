var mongoose = require('mongoose'),
    ContactUs = mongoose.model('ContactUs');

exports.fetchDetails = function(req,res) {
    var projection = '-_id -__v';
    ContactUs.find({},projection,function(err,contactus) {
        if(err) {
            res.status(500).json({message:"Internal server error"});
            console.log(err);
        }
        if(contactus!= null && contactus.length == 0){
            res.status(400).json({message: "No content"});
        }
        res.json(contactus);
    })
};

exports.uploadDetails = function(req,res) {
    // var query = {"contactus":"about"};
    var contactus = new ContactUs(req.body);
    contactus.save(function(err,result){
        if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
        }
        res.status(200).json({ message: "success" });
    });
};
var mongoose = require('mongoose'),
    RequestStock = mongoose.model('RequestStock');

exports.fetchDetails = function(req,res) {
    var projection = '-_id -__v';
    RequestStock.find({},projection,function(err,reqStock) {
        if(err) {
            res.status(500).json({message:"Internal server error"});
            console.log(err);
        }
        if(reqStock!= null && reqStock.length == 0){
            res.status(400).json({message: "No content"});
        }
        res.json(reqStock);
    })
};

exports.uploadDetails = function(req,res) {
    // var query = {"reqStock":"about"};
    var reqStock = new RequestStock(req.body);
    reqStock.save(function(err,result){
        if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
        }
        res.status(200).json({ message: "success" });
    });
};
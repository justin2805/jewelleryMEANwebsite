var mongoose = require('mongoose'),
    AboutUs = mongoose.model('AboutUs');

exports.fetchDetails = function(req,res) {
    AboutUs.find({},function(err,aboutus) {
        if(err) {
            res.status(500).json({message:"Internal server error"});
            console.log(err);
        }
        if(aboutus!= null && aboutus.length == 0){
            res.status(400).json({message: "No content"});
        }
        res.json(aboutus);
    })
};

exports.uploadDetails = function(req,res) {
    var query = {"about":"about"};
    AboutUs.findOneAndUpdate(query,req.body,{upsert:true, new:true}, function(err,result){
        if(err) {
            res.status(500).json({message:"Internal server error"});
            console.log(err);
        }
        res.status(200).json({message:"success"});
    }); 
};
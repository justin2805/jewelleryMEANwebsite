var mongoose = require('mongoose'),
    AboutUs = mongoose.model('AboutUs');

exports.fetchDetails = function(req,res) {
    AboutUs.find({},function(err,aboutus) {
        if(err) {
            res.send(err);
        }
        if(aboutus!= null && aboutus.length == 0){
            res.status(400);
                res.json({
                    "status": "No data"
                })
        }
        res.json(aboutus);
    })
};

exports.uploadDetails = function(req,res) {
    var query = {"about":"about"};
    AboutUs.findOneAndUpdate(query,req.body,{upsert:true, new:true}, function(err,result){
        if(err) {
            res.send(err);
        }
        res.status = 200;
        res.json({
            "status":"success"
        })
    }) 
};
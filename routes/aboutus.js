var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/saireni';

// to get the About Us data for the user-
router.get('/aboutus',function(req,res,next){
    
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err);
        
        console.log("connected to mongoclient at:: GET:: "+url+"/aboutus");
        
        db.collection('aboutus').find().toArray(function(err,docs){
            assert.equal(null,err);            

            if(docs!= null && docs.length ==0){
                res.status(400);
                res.json({
                    "error":"No data"
                }) 
                return;
            }

            docs.forEach(function(doc){
                console.log(doc.name+"::"+doc.description);
            });
            res.send(docs);
        });
        
    });

});

// to upload the About Us data
router.post('/aboutus',function(req,res,next){
    var aboutus = req.body;
    if (!aboutus.name || !aboutus.description){
        res.status(400);
        res.json({
            "error":"Bad data"
        });
    } else {
        MongoClient.connect(url,function(err,db){
            assert.equal(null,err);

            console.log("connected to mongoclient at:: POST:: "+url+"/aboutus");

            db.collection('aboutus').insertOne({
                "name" : aboutus.name,
                "description" : aboutus.description

            },function(err,res){
                assert.equal(null,err);
                console.log("Inserted the document into the about us collection");
            })

            res.status(200);
            res.json({
                "success":"success"
            })
            

        })
    }
});

module.exports = router;
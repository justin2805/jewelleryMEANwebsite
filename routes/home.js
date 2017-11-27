var express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    multer = require('multer'),
    util = require('util'),
    uploads = multer({limits:{fileSize:1000000}, dest: "./uploads/"});

var url = 'mongodb://localhost:27017/saireni';


router.get('/home',function(req,res,next){
    console.log('connected to mongoclient at:: GET:: '+url+'/home');
    res.status(400);
    res.json({
        "error":"No data"
    })
});

router.post('/home',uploads.single('picture'),function(req,res,next){
    console.log('connected to mongoclient at:: POST:: '+url+'/home');    
    if(req.file == null){
        res.status = 400;
        res.json({
            "error" : "Bad data"
        })
    } else {
        MongoClient.connect(url,function(err,db){

        })
    }
});

module.exports = router;
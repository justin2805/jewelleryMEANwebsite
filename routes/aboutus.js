var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27018/saireni';

router.get('/aboutus',function(req,res,next){
    
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err);
        console.log("connected to mongoclient at: "+url);
        db.close;
        console.log("db closed");        
    });

});

module.exports = router;
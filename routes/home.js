var express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    multer = require('multer'),
    util = require('util'),
    fs = require('fs'),
    uuid = require('uuid'),
    path = require('path');

var url = 'mongodb://localhost:27017/saireni';


router.get('/home', function (req, res, next) {
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err);   
        console.log('connected to mongoclient at:: GET:: ' + url + '/home');
        db.collection('home').find().toArray(function(err,docs){
            assert.equal(null,err);
            if(docs!=null && docs.length==0){
                res.status(400);
                res.json({
                    "error": "No Data"
                })
                return;
            }
            docs.forEach(function(doc){
                console.log(doc.imageFileNamePath);
            });
            res.send(docs);
        });
    });
});

router.post('/home', (req, res) => {
    console.log('connected to mongoclient at:: POST:: ' + url + '/home');

    var homeData = req.body;
    if (!homeData.base64String) {
        res.status = 400;
        res.json({
            "error": "Bad data"
        })
    } else {
        var base64String = homeData.base64String;
        var ext = base64String.split(';')[0].match(/jpeg|png|gif|jpg/)[0];
        var data = base64String.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        var relativeImageFilePath = './uploads/' + uuid.v4() + '.' + ext;
        let completeImgFilePath = path.join(__dirname + '/../uploads/' + uuid.v4() + '.' + ext);
        fs.writeFile(relativeImageFilePath, buf, (error) => {
            if (error) {
                console.log(error);
                throw error;
            }
            MongoClient.connect(url, function (err, db) {
                assert.equal(null, err);
                console.log("connected to MongoClient at:: POST:: " + url + "/home");

                db.collection('home').insertOne({
                    "imageFileNamePath": completeImgFilePath
                }, function (err, res) {
                    assert.equal(null, err);
                });
                res.status = 200;
                res.json({
                    "success": "Image uploaded successfully!"
                })
            });
        });
    }
});

module.exports = router;
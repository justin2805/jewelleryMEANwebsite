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
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log('Get request at /home');
        db.collection('home').find().toArray(function (err, docs) {
            assert.equal(null, err);
            if (docs != null && docs.length == 0) {
                res.status(204);
                res.json({
                    "error": "No Data"
                })
                return;
            }
            res.send(docs);
        });
    });
});

/**
 * Model: home{image}
 * 
 * Image sent to server in the format of base64String from the client end.
 */
router.post('/home', (req, res) => {
    console.log('Get request at /home');

    var homeData = req.body;
    if (!homeData.base64String) {
        res.status = 400;
        res.json({
            "error": "Bad data"
        })
    } else {
        var base64String, ext, data, buf, relativeImageFilePath, completeImgFilePath;
        if (!homeData.base64String) {
            base64String = homeData.base64String;
            ext = base64String.split(';')[0].match(/jpeg|png|gif|jpg/)[0];
            data = base64String.replace(/^data:image\/\w+;base64,/, "");
            buf = new Buffer(data, 'base64');
            relativeImageFilePath = './home/' + uuid.v4() + '.' + ext;
            completeImgFilePath = path.join(__dirname + '/../home/' + uuid.v4() + '.' + ext);
            fs.writeFile(relativeImageFilePath, buf, (error) => {
                if (error) {
                    console.log(error);
                    throw error;
                }
            });
        }
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);

            db.collection('home').insertOne({
                "imageFileNamePath": completeImgFilePath
            }, function (err, res) {
                assert.equal(null, err);
            });
            res.status = 201;
            res.json({
                "success": "Success"
            })
        });
    }
});

module.exports = router;
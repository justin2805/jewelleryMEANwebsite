var express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    multer = require('multer'),
    util = require('util'),
    fs = require('fs'),
    uuid = require('uuid');

var url = 'mongodb://localhost:27017/saireni';


router.get('/products', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log('Get request at /products');
        db.collection('products').find().toArray(function (err, docs) {
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
 * Model: products{imageFileNamePath,name,isAvail,description,quality,safety_info,legal_disclaimer}
 * 
 * image sent fromt the client end in the form of base64String
 */
router.post('/products', (req, res) => {
    console.log("Post request at /products"+productData);    
    var productData = req.body;
    if (!productData.name) {
        res.status = 400;
        res.json({
            "error": "Bad data"
        })
    } else {
        var base64String, ext, data, buf, relativeImageFilePath, completeImgFilePath;
        if (productData.base64String != null && productData.base64String != "") {
            base64String = productData.base64String;
            ext = base64String.split(';')[0].match(/jpeg|png|gif|jpg/)[0];
            data = base64String.replace(/^data:image\/\w+;base64,/, "");
            buf = new Buffer(data, 'base64');
            relativeImageFilePath = './products/' + uuid.v4() + '.' + ext;
            completeImgFilePath = path.join(__dirname + '/../products/' + uuid.v4() + '.' + ext);
            fs.writeFile(relativeImageFilePath, buf, (error) => {
                if (error) {
                    console.log(error);
                    throw error;
                }
            });
        }

        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);

            db.collection('products').insertOne({
                "imageFileNamePath": completeImgFilePath,
                "name": productData.name,
                "cost": productData.cost,
                "isAvail": productData.isAvail,
                "description": productData.description,
                "quality": productData.quality,
                "safety_info": productData.safety_info,
                "legal_disclaimer": productData.legal_disclaimer
            }, function (err, res) {
                assert.equal(null, err);
            });
            res.status = 201;
            res.json({
                "success": "success"
            })
        });
    }
});

module.exports = router;
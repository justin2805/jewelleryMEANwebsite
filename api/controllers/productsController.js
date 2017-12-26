var express = require('express'),
    router = express.Router(),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Products = mongoose.model('Products'),
    formidable = require('formidable'),
    path = require('path');


exports.fetchAllProducts = function (req, res) {
    Products.find({}, function (err, products) {
        if (err) {
            res.send(err);
        }
        if (products != null && products.length == 0) {
            res.status(400);
            res.json({
                "status": "No data"
            })
        }
        res.json(products);
    })
};

exports.uploadProducts = function (req, res) {

    var form = new formidable.IncomingForm();
    var imageFileNamePath;

    form.on('fileBegin', function (name, file) {
        var extension = file.type;
        extension = extension.split("/").pop();
        file.path = path.join(__dirname + `/../../uploads/` + uuid.v4() + "." + extension);
        imageFileNamePath = file.path;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + imageFileNamePath);
    });
    form.parse(req, (err, fields, files) => {

        var new_product = new Products(fields);
        new_product.product_imagePaths[0] = imageFileNamePath;

        new_product.save(function (err, product) {
            if (err) {
                res.send(err);
            }
            res.status = 200;
            res.json({
                "status": "success"
            });
        });
    });
};



exports.fetchSingleProduct = function (req, res) {
    Products.findOne({ 'productId': req.params.productId }, function (err, product) {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
};

exports.updateProduct = function (req, res) {
    var form = new formidable.IncomingForm();
    var query = { 'productId': req.params.productId };
    
    var imageFileNamePath;
    form.on('fileBegin', function (name, file) {
        var extension = file.type;
        extension = extension.split("/").pop();
        file.path = path.join(__dirname + `/../../uploads/` + uuid.v4() + "." + extension);
        imageFileNamePath = file.path;
        console.log(":-----"+imageFileNamePath)
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + imageFileNamePath);
    });
    
    form.parse(req, (err, fields, files) => {
        
        if (imageFileNamePath) {
        fields.product_imagePaths = imageFileNamePath;
        }
        console.log(fields)
        Products.findOneAndUpdate(query, fields, { new: true }, function (err, product) {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    });
};


exports.deleteProduct = function(req,res) {
    Products.remove({'productId':req.params.productId},
    function(err,product) {
        if(err) {
            res.send(err);
        }
        res.json({"status":"Product deleted"});
    }
)
}
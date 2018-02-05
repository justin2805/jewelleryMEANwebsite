var express = require('express'),
    router = express.Router(),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Products = mongoose.model('Products'),
    formidable = require('formidable'),
    path = require('path'),
    fs = require('fs'),
    url = require('url'),
    cloudinary = require('cloudinary'),
    promise = require('promise'),
    async = require('async'),
    util = require('util');

/**
 * GET:
 * Fetch all products stored in the db
 * ALERNATIVE: QUERY
 * if query provided along with url in call like so => url?id=value, 
 * that value will be fetched
 * @param {*} req 
 * @param {*} res 
 */
exports.fetchAllProducts = function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var projection = '-_id';
    Products.find(query, projection, function (err, products) {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
        }
        if (products != null && products.length == 0) {
            return res.status(204).json({ message: "No Content" });
        }
        res.status(200).json(products);
    })
};

/**
 * POST:
 * upload a product into the server/db
 * to use multipart form-data, use of formidable library is done.
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadProducts = function (req, res) {

    var form = new formidable.IncomingForm();
    var imageLocalFileNamePath, imageRemoteFileNamePath, new_product;
    // parse the req object received(in urlencoded form) to form-data form?
    form.parse(req, (err, fields, files) => {
        new_product = new Products(fields);
    });

    let uploadImagePromise = new Promise(function (resolve, reject) {
        // saves image in given location and with randomly generated name
        form.on('fileBegin', function (name, file) {
            var extension = file.type;
            extension = extension.split("/").pop();
            file.path = path.join(__dirname + `/../../uploads/` + uuid.v4() + "." + extension);
            imageLocalFileNamePath = file.path;
        });

        // image save complete
        form.on('file', function (name, file) {
            if (imageLocalFileNamePath) {
                // api call to the cloud server storage to save the image to remote server
                // storage
                cloudinary.uploader.upload(imageLocalFileNamePath, function (result) {
                    if (result && result.url) {
                        imageRemoteFileNamePath = result.url;
                        console.log('Uploaded ' + imageRemoteFileNamePath);
                        // if image is sent in the request then manually add the path into the object
                        if (imageLocalFileNamePath) {
                            new_product.product_imagePaths[0] = imageRemoteFileNamePath;
                        }
                        // delete image from local storage when image is uploaded to server
                        // wont be triggered if user has not uploaded an image in the request
                        fs.unlink(imageLocalFileNamePath, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        resolve()
                    } else {
                        resolve()
                    }
                }, { use_filename: true });
            } else {
                resolve()
            }
        });
    });

    uploadImagePromise.then(function () {
        new_product.save(function (err, product) {
            if (err) {
                res.status(500).json({ message: "Internal server error" });
                console.log(err);
            } else {
                res.status(201).json({ message: "success" });
            }
        });
    }).catch(function () {
        new_product.save(function (err, product) {
            if (err) {
                res.status(500).json({ message: "Internal server error" });
                console.log(err);
            } else {
                res.status(201).json({ message: "success" });
            }
        });
    });
};


/**
 * GET:
 * fetch all the details of the given product. productId passed as param => url/:productId
 * @param {*} req 
 * @param {*} res 
 */
exports.fetchSingleProduct = function (req, res) {
    Products.findOne({ 'productId': req.params.productId }, '-_id', function (err, product) {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
        }
        res.status(200).json(product);
    });
};

/**
 * PUT: 
 * update the details of the given product. productId passed as param => url/:productId
 * @param {*} req 
 * @param {*} res 
 */
exports.updateProduct = function (req, res) {
    var form = new formidable.IncomingForm();
    var query = { 'productId': req.params.productId };

    var imageRemoteFileNamePath, imageFileNamePath, prodFields;

    form.parse(req, (err, fields, files) => {
        prodFields = new Products(fields);
        console.log(util.inspect({fields:fields, files:files}))
        if(files !== null && files.myFile !== undefined && files.myFile.size !== undefined) {
            
        } else {
            prodFields = prodFields.toObject();
            delete prodFields["_id"];
            delete prodFields["product_imagePaths"];
            // return old object after successful query completion for use in fs.unlink
            Products.findOneAndUpdate(query, prodFields, { new: false }, function (err, product) {
                if (err) {
                    res.status(500).json({ message: "Internal server error" });
                    console.log(err);
                }
                console.log('updated in db');
                // if a new image was added, delete the old image file since the old imagepath 
                // is replaced with the new path
                if (imageRemoteFileNamePath) {
                    console.log('imageRemoteFileNamePath : ' + imageRemoteFileNamePath);
                    cloudinary.uploader.destroy(product.product_imagePaths[0],
                        function (result) {
                            console.log('deleted from dloudinary');
                            console.log(result)
                        });
                }
                res.status(200).json(product);
            });   
        }
    });

    let updateProdsPromise = new Promise(function (resolve, reject) {
        form.on('fileBegin', function (name, file) {
            var extension = file.type;
            extension = extension.split("/").pop();
            file.path = path.join(__dirname + `/../../uploads/` + uuid.v4() + "." + extension);
            imageFileNamePath = file.path;
        });

        form.on('file', function (name, file) {
            if (imageFileNamePath) {
                cloudinary.uploader.upload(imageFileNamePath, function (result) {
                    if (result && result.url) {
                        imageRemoteFileNamePath = result.url;
                        prodFields.product_imagePaths[0] = imageRemoteFileNamePath;

                        // delete image from local storage when image is uploaded to server
                        // wont be triggered if user has not uploaded an image in the request
                        fs.unlink(imageFileNamePath, function (err) {
                            console.log('02')
                            if (err) {
                                console.log(err);
                            }
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    });

    updateProdsPromise.then(function () {
        prodFields = prodFields.toObject();
        delete prodFields["_id"];
        // return old object after successful query completion for use in fs.unlink
        Products.findOneAndUpdate(query, prodFields, { new: false }, function (err, product) {
            if (err) {
                res.status(500).json({ message: "Internal server error" });
                console.log(err);
            }
            console.log('updated in db');
            // if a new image was added, delete the old image file since the old imagepath 
            // is replaced with the new path
            if (imageRemoteFileNamePath) {
                console.log('imageRemoteFileNamePath : ' + imageRemoteFileNamePath);
                cloudinary.uploader.destroy(product.product_imagePaths[0],
                    function (result) {
                        console.log('deleted from dloudinary');
                        console.log(result)
                    });
            }
            res.status(200).json(product);
        });
    }).catch(function () {
        // return old object after successful query completion for use in fs.unlink
        Products.findOneAndUpdate(query, prodFields, { new: false }, function (err, product) {
            if (err) {
                res.status(500).json({ message: "Internal server error" });
                console.log(err);
            }
            console.log('updated in db');
            // if a new image was added, delete the old image file since the old imagepath 
            // is replaced with the new path
            if (imageRemoteFileNamePath) {
                console.log('imageRemoteFileNamePath : ' + imageRemoteFileNamePath);
                cloudinary.uploader.destroy(product.product_imagePaths[0],
                    function (result) {
                        console.log('deleted from dloudinary');
                        console.log(result)
                    });
            }
            res.status(200).json(product);
        });
    });
};

/**
 * DELETE:
 * delete the given product. productId passed as param => url/:productId
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteProduct = function (req, res) {
    let prod;
    let deleteImagePromise = new Promise(function (resolve, reject) {
        Products.findOneAndRemove({ 'productId': req.params.productId },
            function (err, product) {
                if (err) {
                    reject();
                    // res.status(500).json({ message: "Internal server error" });
                    console.log(err);
                }
                prod = product;
                resolve();
                // res.status(200).json({ message: "Product deleted" });
            }
        )
    });

    deleteImagePromise.then(function () {
        if (prod != null && prod.product_imagePaths[0] !== null) {
            console.log('not null')
            cloudinary.uploader.destroy(prod.product_imagePaths[0],
                function (result) {
                    console.log(result)
                    res.status(200).json({ message: "Product deleted" });
                });
        }
    }).catch(function () {
        res.status(500).json({ message: "Internal server error" });
    });

}


// exports.updateProductCollectionForCartProcess = function (req, res, next) {
//     var orderFields;
//     var query;
//     if (req.user.usertype === 'ADMIN') {
//         var len = req.body.order.length;
//         console.log('looping for len : '+len);
        
//         var index = 0;
//         async.series([
//             function(done) {
//                 Products.find(function(err,products){
//                     async.each(products, function(product, callback){
//                         var i = index;
//                         if(product.productId === req.body.order[i].productId) {
//                             product.quantity = product.quantity - 
//                             req.body.order[i].prod_ordered_qty;
//                             console.log(i+" : product.quantity : "+product.quantity)
//                             product.save(callback);
//                             index++;
//                         }
//                     })
//                 },done)
//             }
//         ]), function allTaskCompleted() {
//             console.log('done');
//             next();
//         }
        
        
        
        
        // for (index = 0; index < len; index++) {
        //     query = null;
        //     orderFields = null;
        //     query = { 'productId': req.body.order[index].productId };
        //     orderFields = { $inc :{'quantity' : -req.body.order[index].prod_ordered_qty}};
        //     console.log("Iteration at : "+index);
        //     console.log(query);
        //     console.log(orderFields)
        //     Products.findOneAndUpdate(query, orderFields, { new: false }, function (err, product) {
        //         if (err) {
        //             console.log(err);
        //             res.status(500).json({ message: "Internal server error" });
        //         } else {
        //             // if (index = len - 1) {
        //             //     console.log('next triggered')
        //             //     next();
        //             // }
        //             if (index = len - 1) {
        //                 console.log('next triggered: index :: '+index+" :: len :: "+len)
        //                 next();
        //             }
        //         }
        //         // res.status(200).json(product);
        //     });
        //     // if (index = len - 1) {
        //     //     console.log('next triggered: index :: '+index+" :: len :: "+len)
        //     //     next();
        //     // }
        // };
//     }
// }
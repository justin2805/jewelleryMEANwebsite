var express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    multer = require('multer'),
    util = require('util'),
    fs = require('fs'),
    fileType = require('file-type'),
    upload = multer({
        dest:'./uploads/',
        limits:{fileSize:10000000,files:1},
        fileFilter:(req,file,callback) => {
            if(!file.originalname.match(/\.(jpg|jpeg)$/)){
                return callback(new Error('Only images are allowed !',false))
            }
            callback(null,true);
        }
    }).single('image');

var url = 'mongodb://localhost:27017/saireni';


router.get('/home/:imagename',function(req,res,next){
    console.log('connected to mongoclient at:: GET:: '+url+'/home');
    // res.status(400);
    // res.json({
    //     "error":"No data"
    // })

    let imagename = req.params.imagename;
    let imagepath = __dirname+'/../uploads/'+imagename;
    let image =  fs.readFileSync(imagepath);
    let mime = fileType(image).mime;

    res.writeHead(200, {'Content-Type':mime});
    res.end(image,'binary')
});

router.post('/home',(req,res) =>{
    console.log('connected to mongoclient at:: POST:: '+url+'/home');    
    
    // if(req.file == null){
    //     res.status = 400;
    //     res.json({
    //         "error" : "Bad data0"
    //     })
    // } else {
        // MongoClient.connect(url,function(err,db){

        console.log('point 1')
        upload(req,res,function(err){
        if(err){
            res.status = 400;
            res.json({
                  "error" : err.message});
        } else {
            let path = `/uploads/${req.file.filename}`
            res.status(200).json({message:'Image uploaded successfully!',path:path});
        }
    })
// })
// }
    
    
    
    
});

module.exports = router;
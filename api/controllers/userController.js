var mongoose = require('mongoose'),
    Users = mongoose.model('Users');


/**
 * Registeration::
 * Add user to the db
 * Model: user{name, phone, email, address, usertype}
 * 
 */
exports.registerUser = function(req,res){  
    // handle validator error for missing field, unique key-email
        var new_user = new Users(req.body);
        new_user.save(function(err,result){
            if (err) {
                res.send(err);
                // return res.status(500).send(err);
            }
            // if (result.insertedId) {
            //     res.status = 201;
            //     res.json({
            //         "status": "Success"
            //     })
            // }
            res.status = 200;
            res.json({
                "status":"success"
            })
        });
    };
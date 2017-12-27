var mongoose = require('mongoose'),
    Users = mongoose.model('Users'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');


/**
 * Registeration::
 * Add user to the db
 * Model: user{name, phone, email, address, usertype}
 * 
 */
exports.registerUser = function (req, res) {
    // handle validator error for missing field, unique key-email
    var new_user = new Users(req.body);
    new_user.hash_password = bcrypt.hashSync(req.body.password, 10);
    new_user.save(function (err, result) {
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
        result.hash_password = undefined;
        res.status = 200;
        res.json({
            "status": "success"
        })
    });
};



exports.sign_in = function (req, res) {
    var query = { email: req.body.email };
    Users.findOne(query, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.status(401).json({ "status": "Authentication failed. User not found." });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ "status": "Authentication failed. Wrong password" });
            } else {
                return res.json({
                    token: jwt.sign(
                        { email: user.email, name: user.name, userId: user.userId },
                        "SagarAirenisSecretKey")
                });
            }
        }
    });
};




exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};
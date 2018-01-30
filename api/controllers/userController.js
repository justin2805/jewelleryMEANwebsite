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
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
        }
        result.hash_password = undefined;
        res.status(200).json({ message: "success" });
    });
};



exports.sign_in = function (req, res) {
    var query = { email: req.body.email };
    Users.findOne(query, function (err, user) {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
        }
        if (!user) {
            res.status(401).json({ message: "Authentication failed. User not found." });
        } else if (user) {
            console.log(user)
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: "Authentication failed. Wrong password!" });
            } else {
                return res.status(200).json({
                    token: jwt.sign(
                        { email: user.email, name: user.name, userId: user.userId, 
                            usertype: user.usertype },
                        process.env.JWT_SECRET_KEY), 
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        address: user.email,
                        usertype: user.usertype,
                        userId: user.userId
                });
            }
        }
    });
};



// req.user inserted & obtained by verify of token - done by middleware intercept in index.js
// might need to validate the usertype, either here or in another method
exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};
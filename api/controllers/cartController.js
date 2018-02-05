var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Cart = mongoose.model('Cart'),
    formidable = require('formidable'),
    path = require('path'),
    fs = require('fs'),
    url = require('url'),
    promise = require('promise');

/**
 * GET:
 * Fetch all orders stored in the db
 * ALERNATIVE: QUERY
 * if query provided along with url in call like so => url?id=value, 
 * that value will be fetched
 * ADMIN role will be provided with complete data.
 * OTHER role will be provided with data relevant to userId only
 * @param {*} req 
 * @param {*} res 
 */
exports.fetchAllOrders = function (req, res) {
    // var url_parts = url.parse(req.url, true);
    // var query = url_parts.query;
    var query;
    if (req.user.usertype === 'ADMIN') {
        query = {};
    } else {
        query = { 'userId': req.user.userId };
    }
    var projection = '-_id';
    Cart.find(query, projection, {sort:{'ordered_date':-1}},function (err, cart) {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
        }
        if (cart != null && cart.length == 0) {
            return res.status(204).json({ message: "No Content" });
        }
        res.status(200).json(cart);
    })
}

/**
 * GET:
 * fetch all the details of the given order. orderId passed as param => url/:orderId
 * @param {*} req 
 * @param {*} res 
 */
exports.fetchSingleOrder = function (req, res) {
    var query;
    if (req.user.usertype === 'ADMIN') {
        query = { 'orderId': req.params.orderId };
    } else {
        query = {
            'userId': req.user.userId,
            'orderId': req.params.orderId
        };
    }
    var projection = '-_id';
    Cart.findOne(query, projection, function (err, cart) {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
        }
        if (cart == null) {
            return res.status(204).json({ message: "No Content" });
        }
        res.status(200).json(cart);
    });
}

/**
 * POST:
 * place an order into the server/db
 * @param {*} req 
 * @param {*} res 
 */
exports.placeOrder = function (req, res) {
    // var query = {"reqStock":"about"};
    var cart = new Cart(req.body);
    cart.save(function (err, result) {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
        }
        res.status(200).json({ message: "success" });
    });
}

/**
 * PUT: 
 * update the details of the given order. orderId passed as param => url/:orderId
 * @param {*} req 
 * @param {*} res 
 */
exports.updateOrder = function (req, res) {
    var orderFields = req.body;
    var query;
    if (req.user.usertype === 'ADMIN') {
        console.log('Admin')
        query = { 'orderId': req.params.orderId };
    } else {
        query = {
            'userId': req.user.userId,
            'orderId': req.params.orderId
        };
    }
    Cart.findOneAndUpdate(query, orderFields, { new: false }, function (err, cart) {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
        }
        res.status(200).json(cart);
    });
}
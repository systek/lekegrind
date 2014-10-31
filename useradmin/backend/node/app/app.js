var util = require('util');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/lekegrind", {native_parser:true});

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    console.log("REQUEST --> " + req.url);
    next();
});

var router = express.Router();
app.use(router);


router.get('/', function (req, res) {
    res.send('nothing here...');
});

router.route('/api/users/:query')

    .get(function(req, res) {
        var query = req.params.query;
        db.collection('users').find(
            {$or:[
                {firstName: query},
                {lastName: query},
                {email: query}
            ]})
            .toArray(function (err, items) {
                console.log("Found items: " + util.inspect(items));
                res.json(items);
            });
    });

router.route('/api/user/:userId')

    .get(function(req, res) {
        var userId = parseInt(req.params.userId);
        db.collection('users').find({id: userId})
            .toArray(function (err, items) {
                console.log("Found item: " + util.inspect(items));
                res.json(items[0]);
            });
    })

    .put(function(req, res) {
        var userId = parseInt(req.params.userId);
        console.log("Updating item: " + userId)
        db.collection('users').update({id: userId}, req.body, function(err, result) {
            console.log("Updated items: " + result);
            res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
        });
    })

    .delete(function(req, res) {
        var userId = parseInt(req.params.userId);
        db.collection('users').remove({id: userId}, function(err, result) {
            console.log("Deleted items: " + result);
            res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
        });
    });

router.post('/api/user', function (req, res) {

    db.collection('users').insert(req.body, function(err, result) {
        console.log("Inserted item: " + util.inspect(result));
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = app;

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/app/index.html');
});

module.exports = router;

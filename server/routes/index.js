var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'ExchangWorld' });
});

router.get('/seekkk', function(req, res, nex) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ a: "testinggggggggggg" }));
    //console.log("gopyupylk");
});

module.exports = router;

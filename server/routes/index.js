var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'ExchangWorld' });
});

router.get('/seek', function(req, res, nex) {
    res.send("bghnmk");
});

module.exports = router;
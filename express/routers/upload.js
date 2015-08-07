var express = require('express');
var fs = require('fs');
var router = express.Router();

// including tables for photoPath
var goods = require('../ORM/Goods');

// Handle posting image
router.post('/image', function(req, res, next) {

	/*
	 * POST body looks like:
	 * imgData=/9j/2wCEAAgGBgcGBQgHBwcJC...
	 * imgFormat=png
	 */

    // Get base64 encoded imgData from request body
    var imgData = req.body.imgData;

    // Get image format type, like jpg or png
    var imgFormat = req.body.format;

    // Remove annotations and fix space to +
    // And become pure base64 string
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "").replace(/\s/g, "+");

    // Open a buffer stream
    var dataBuffer = new Buffer(base64Data, 'base64');

    // Write to file and its name will be prepend with timestamp
    fs.writeFile((new Date().getTime()) + '.' + imgFormat, dataBuffer, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send("upload success");
        }
    });
});

module.exports = router;

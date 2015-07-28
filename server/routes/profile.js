var express = require('express');
var router  = express.Router();

// including tables 
var goods   = require('../ormModel/Goods');
var user    = require('../ormModel/User.js');

router.get('/', function(req, res, nex) {

    // Available params:
    // 
    // fb_id 
    // 

    // Get property:value in ?x=y&z=w....
    var _fb_id = req.query.fb_id;

	// Set association between tables (user, goods)
	user.hasMany(goods, {foreignKey:'ownerID'});
	goods.belongsTo(user, {foreignKey: 'ownerID'});

    // Emit a find operation with orm model in table `goods`
    goods.sync({
        force: false
    }).then(function() {
		/**
 		 * SELECT `goods`. * , `user`.*
		 * FROM `goods`, `user`
		 * WHERE `user`.`fb_id` = '_fb_id' AND `user`.`fb_id` = `goods`.`ownerID`
		 */
        return user.findAll({
            where: {
				fb_id : _fb_id
            },
			include: [goods]
        });
    }).then(function(result) {
        res.json(result);
    });
    
});


module.exports = router;

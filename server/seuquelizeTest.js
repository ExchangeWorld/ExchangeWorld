var Goods = require('./ormModel/Goods');

Goods.sync({
    force: false
}).then(function() {
    return Goods.create({
        gname: "this is a test",
        photoPath: "yooo",
        categories: "yoooooo",
        description: "yooooooo",
        want: "yooooooloooo",
        posX: 123.2,
        posY: 3.4,
        ownerID: "1029393",
        status: 1
    })
});

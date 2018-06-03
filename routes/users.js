let express = require('express');
let router = express.Router();


let gameFacade = require('../public/javascripts/GameBuildFacade');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/allUsers', function showUsers(req, res, next) {
    console.log("Servers::Users::showUsers(.. )");
    // TODO: do with gameFacade.allUsers()
    const allusers = gameFacade.allUsers();
    return next();
});

module.exports = router;

// import GameBuildFacade from "../public/javascripts/GameBuildFacade";

let express = require('express');
let router = express.Router();

let gameFacade = require('../public/javascripts/GameBuildFacade');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' }); // TODO: just test, remove it later
});

router.get('/hi', function(req, res, next) {
    res.sendfile('./views/injex.html'); // TODO: just test, remove it later
});

// TODO: implement other functions below
router.get('/update/:game/:kind', (req, res, next) => {
    console.log("Server::addData(..)");
    const gameID = parseInt(req.params.game);
    const kind = req.params.kind;
    let url = "api-hi";
    console.log(gameID);
    console.log(kind);
    // TODO: add condition, gameID, Champion or Item
    if (kind === "champion") {
        gameFacade.updateChampions(url, gameID);
        console.log("Server::updateChampions() - " + gameID);
    } else if (kind === "item") {
        gameFacade.updateItems(url, gameID);
        console.log("Server::updateItems() - " + gameID);
    }

    return next();
});

module.exports = router;

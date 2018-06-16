let path = require('path');
let express = require('express');
let router = express.Router();

let gameFacade = require('../public/javascripts/GameBuildFacade');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get('/toolbox', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/toolbox.html'));
});

router.get('/toolbox=:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/toolbox.html'));
});

router.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.get('/signup', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

router.get('/items', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/items2.html'));
});

router.get('/settings/:uid/champion=:champ', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/accountinfo.html'));
});

router.get('/settings/:id/DeleteMyAccount', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/accountcancellation.html'));
});

router.get('/champions', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/champion_filter.html'));
});

router.get('/jinx', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/jinx.html'))
});

router.get('/item', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/singleitem.html'));
});

router.get('/getItemInfo=:id', (req, res, next) => {
    console.log("Server::getItemInfo(..)");
    const itemID = req.params.id;
    gameFacade.showItemInfo(itemID).then((response) => {
        res.status(response.code);
        res.json(response.body);
        console.log(response.code);
        console.log(response.body.result);
    }).catch((err) => {
        res.status(err.code);
        res.json(err.body);
        console.log(err.code);
    });
});

// TODO: change the ids in items2.html
router.get('/itemInfo/:id/:name/:stat/:extra', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/item.html'));
});

router.post('/cancelAccount', (req, res, next) => {
    console.log("Server::DeleteAccount(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const userID = data['id'];
    const accID = data['accID'];
    const password = data['pw'];
    gameFacade.deleteAccount(userID, accID, password).then((response) => {
        res.status(response.code);
        res.json(response.body);
        console.log(response.code);
    }).catch((err) => {
        res.status(err.code);
        res.json(err.body);
        console.log(err.code);
    });
});

router.post('/resetPassword', (req, res, next) => {
    console.log("Server::ResetPassword(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const userID = data['id'];
    const accID = data['accID'];
    const password = data['newPW'];
    const oldPWD = data['oldPW'];
    gameFacade.resetPassword(userID, accID, oldPWD, password).then((response) => {
        res.status(response.code);
        res.json(response.body);
        console.log(response.code);
    }).catch((err) => {
        res.status(err.code);
        res.json(err.body);
        console.log(err.code);
    });
});

router.get('/settings/:id/ResetPassword', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/resetpwd.html'));
});

router.post('/getAccountInfo', (req, res, next) => {
    console.log("Server::getAccountInfo(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const accid = data['accID'];
    gameFacade.getUserInfo(accid).then((response) => {
        res.status(response.code);
        res.json(response.body);
        console.log(response.code);
        console.log(response.body.result);
    }).catch((err) => {
        res.status(err.code);
        res.json(err.body);
        console.log(err.code);
    });
});

router.post('/signup', (req, res, next) => {
    console.log("Server::SignUp(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const id = data['id'];
    const accid = data['accID'];
    const name = data['name'];
    const pw = data['pw'];
    gameFacade.register(id, accid, name, pw).then((response) => {
        res.status(response.code);
        res.json(response.body);
        console.log(response.code);
    }).catch((err) => {
        res.status(err.code);
        res.json(err.body);
        console.log(err.code);
    });
});

router.post("/login", function (req, res, next) {
    console.log("Server::Login(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const accountID = data['id'];
    const password = data['pw'];
    gameFacade.login(accountID, password).then((response) => {
        res.status(response.code);
        res.json(response.body);
        console.log(response.code);
    }).catch((err) => {
        res.status(err.code);
        res.json(err.body);
        console.log(err.code);
    });
});

// TODO: implement other functions below
router.get('/update/:game/:kind', (req, res, next) => {
    console.log("Server::updateData(..)");
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


});



// TODO: TEst below
router.get('/testPage/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/accountinfoTest.html'));
});

router.post('/testPageTest', (req, res, next) => {
    console.log("Server::getAccountInfo(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const accid = data['accID'];
    gameFacade.getUserInfo(accid).then((response) => {
        res.status(response.code);
        res.json(response.body);
        console.log(response.code);
        console.log(response.body.result);
    }).catch((err) => {
        res.status(err.code);
        res.json(err.body);
        console.log(err.code);
    });
});

module.exports = router;

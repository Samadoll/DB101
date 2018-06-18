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

// router.get('/settings/:uid/champion=:champ', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../views/accountinfo.html'));
// });

router.get('/settings/:id/DeleteMyAccount', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/accountcancellation.html'));
});

router.get('/champions', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/champion_filter.html'));
});

router.get('/champions=:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/champion_filter.html'));
});

router.get('/item', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/singleitem.html'));
});

router.get('/counterSelection', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/counter_b.html'));
});

router.get('/counterSelection&cid=:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/counter_b.html'));
});

router.get('/counterSelection=:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/counter_b.html'));
});

router.get('/counterSelection=id&cid=:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/counter_b.html'));
});

// router.get('/getItemInfo=:id', (req, res, next) => {
//     console.log("Server::getItemInfo(..)");
//     const itemID = req.params.id;
//     //Test
//     //gameFacade.saveChampion(1234, 154).then((response) => {
//     gameFacade.showItemInfo(itemID).then((response) => {
//         res.status(response.code);
//         res.json(response.body);
//         console.log(response.code);
//         console.log(response.body.result);
//     }).catch((err) => {
//         res.status(err.code);
//         res.json(err.body);
//         console.log(err.code);
//     });
// });


// router.get('/itemInfo/:id/:name/:stat/:extra', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../views/item(omitted).html'));
// });

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

// router.post('/getAccountInfo', (req, res, next) => {
//     console.log("Server::getAccountInfo(..)");
//     const raw = req.body;
//     const data = JSON.parse(Object.keys(raw)[0]);
//     const accid = data['accID'];
//     gameFacade.getUserInfo(accid).then((response) => {
//         res.status(response.code);
//         res.json(response.body);
//         console.log(response.code);
//         console.log(response.body.result);
//     }).catch((err) => {
//         res.status(err.code);
//         res.json(err.body);
//         console.log(err.code);
//     });
// });

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


// TODO: Test below using new Logic
router.get('/Settings/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/accountinfo.html'));
});

router.post('/SettingsPage', (req, res, next) => {
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

router.get('/getItemInfo/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/item.html'));
});

router.post('/getItemInfo', (req, res, next) => {
    console.log("Server::getItemInfo(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const iid = data['itemID'];
    gameFacade.showItemInfo(iid).then((response) => {
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

router.get('/getChampionInfo/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/jinx.html'));
});

router.get('/getChampionInfo=:aid/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/jinx.html'));
});

router.post('/getChampionInfo', (req, res, next) => {
    console.log("Server::getChampionInfo(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const cid = data['champID'];
    gameFacade.showChampionInfo(cid).then((response) => {
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

router.post('/getSuggestItems', (req, res, next) => {
    console.log("Server::getSuggestItems(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const cid = data['champID'];
    gameFacade.suggestCI(cid).then((response) => {
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

router.post('/saveMyChampion', (req, res, next) => {
    console.log("Server::saveMyChampion(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const cid = data['cid'];
    const aid = data['aid'];
    gameFacade.saveChampion(aid, cid).then((response) => {
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
// TODO: Test Passed above
// TODO: Finished Implementing above.
// TODO: counter below

router.get("/counterPage&aid=:aid&bid=:bid", (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/counter.html'));
});

router.get("/counterPage=:id&aid=:aid&bid=:bid", (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/counter.html'));
});

router.post('/counterPage', (req, res, next) => {
    console.log("Server::counter(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const champA = data['champA'];
    const champB = data['champB'];
    gameFacade.suggestAgainst(champA, champB).then((response) => {
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

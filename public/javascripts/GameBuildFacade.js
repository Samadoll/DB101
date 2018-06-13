let fs = require("fs");
let mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user :'root',
    password: 'password',
    multipleStatements: true
});
db.connect(function (err) {
    if(err) throw err;
    console.log('Database connected');
});

class GameBuildFacade {

    constructor() {
        console.log("Get Started here.");
    }

    // TODO: register new account stored in Database
    // TODO: demo is to save to a json file, replace them later
    // TODO: need to check duplicate
    // TODO: delete accs.json and users.json later
    register(userID, accID, name, password) {
        const data1 = fs.readFileSync("public/javascripts/accs.json", "utf-8");
        const accs = JSON.parse(data1);
        const data2 = fs.readFileSync("public/javascripts/users.json", "utf-8");
        const user = JSON.parse(data2);


        let signup = "USE `GLHF`; INSERT INTO `USER` VALUES (";
        signup += userID + ", '" + name + "');";
        console.log('name is ' + name);
        console.log(signup);
        db.query(signup, function (err, result) {
            if(err) throw err;
        });



        if (Object.keys(accs).includes(accID)) {
            return Promise.reject({code: 400, body: {error: "Account has been taken."}})
        }
        if (Object.keys(user).includes(userID)) {
            user[userID].push(accID);
        } else {
            user[userID] = [accID];
        }
        accs[accID] = password;
        fs.writeFileSync("public/javascripts/accs.json", JSON.stringify(accs), "utf-8");
        fs.writeFileSync("public/javascripts/users.json", JSON.stringify(user), "utf-8");
        return Promise.resolve({code: 200, body: {result: "OK"}});
    }

    // TODO: user Login, check account and password in Database
    login(id, password) {
        const data = fs.readFileSync("public/javascripts/accs.json", "utf-8");
        const accs = JSON.parse(data);
        console.log("Login:: " + id + " :: " + password);
        if (accs[id] === password)
            return Promise.resolve({code: 200, body: {result: "OK"}});
        return Promise.reject({code: 400, body: {error: "invalid username/password."}});
    }

    // TODO: saved the table "account plays games"
    selectGame(accountID, gameID) {
        return Promise.reject(null);
    }

    // TODO: users own champion
    ownChampion(accountID, gameID, ChampionID) {
        return Promise.reject(null);
    }

    // TODO: show owned champions
    showOwnChampions(accountID, gameID) {
        return Promise.reject(null);
    }

    // TODO: add games
    addGame(id, name) {
        return Promise.reject(null);
    }

    // TODO: add Champion to Database via api
    addChampion(gameID) {
        return Promise.reject(null);
    }

    // TODO: add Champion to Database by hand
    addChampion(id, name, stat, position, type, gameID) {
        return Promise.reject(null);
    }

    // TODO: remove Champion from Database by id
    removeChampion(id, gameID) {
        return Promise.reject(null);
    }

    // TODO: show info of a Champion
    showChampionInfo(id, gameID) {
        return Promise.reject(null);
    }

    // TODO: add Item to Database via api
    addItem(gameID) {
        return Promise.reject(null);
    }

    // TODO: add Item to Database by hand
    addItem(id, name, stat, info, gameID) {
        return Promise.reject(null);
    }

    // TODO: remove Item from Database by id
    removeItem(id, gameID) {
        return Promise.reject(null);
    }

    // TODO: show info of an Item
    showItemInfo(id, gameID) {
        return Promise.reject(null);
    }

    // TODO: update all Champions in Database via api
    updateChampions(id, url, gameID) {
        return Promise.reject(null);
    }

    // TODO: update all Items in Database via api
    updateItems(id, url, gameID) {
        return Promise.reject(null);
    }

    // TODO: retrieve suggested items based on one champion
    suggestCI(championID) {
        return Promise.reject(null);
    }

    // TODO: retrieve strategy and suggested items based on two champions
    suggestAgainst(championA, championB) {
        return Promise.reject(null);
    }

    // TODO: show all users from Database
    allUsers() {
        return Promise.resolve({code: 200, body: {result: null}});
    }
}

module.exports = new GameBuildFacade();
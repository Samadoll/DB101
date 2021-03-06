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
    console.log('Database connected in Facade');
});

class GameBuildFacade {

    constructor() {
        console.log("Get Started here.");
    }

    register(userID, accID, name, password) {
        if(password.length < 3){
            return Promise.reject({code: 400, body: {error: "Password length is less than 3."}});
        }
        let signupUser = "USE `GLHF`; INSERT INTO user(id, name) VALUES (";
        signupUser += userID + ", '" + name + "') ON DUPLICATE KEY UPDATE name = VALUES(name);";
        console.log(signupUser);
        db.query(signupUser, function (err) {
            if(err) throw err;
        });

        return new Promise((fulfill, reject)=>{
            db.query("USE `GLHF`; SELECT COUNT(*) FROM Account where id = " + accID, function (err, result) {
                if(err) throw err;
                console.log(result[1][0]['COUNT(*)'] === 1);
                if(result[1][0]['COUNT(*)'] === 1){
                    reject({code: 400, body: {error: "Account has been taken."}});
                }else {
                    let signupAcc = "USE `GLHF`; INSERT INTO `Account` VALUES (";
                    signupAcc += accID + ", '" + password + "', " + userID + ");";
                    console.log(signupAcc);
                    db.query(signupAcc, function (err) {
                        if (err) throw err;
                        fulfill({code: 200, body: {result: "OK"}});
                    });
                }
            });
        });

        // const data1 = fs.readFileSync("public/javascripts/accs.json", "utf-8");
        // const accs = JSON.parse(data1);
        // const data2 = fs.readFileSync("public/javascripts/users.json", "utf-8");
        // const user = JSON.parse(data2);
        // if (Object.keys(accs).includes(accID)) {
        //     return Promise.reject({code: 400, body: {error: "Account has been taken."}})
        // }
        // if (Object.keys(user).includes(userID)) {
        //     user[userID].push(accID);
        // } else {
        //     user[userID] = [accID];
        // }
        // accs[accID] = password;
        // fs.writeFileSync("public/javascripts/accs.json", JSON.stringify(accs), "utf-8");
        // fs.writeFileSync("public/javascripts/users.json", JSON.stringify(user), "utf-8");
        // return Promise.resolve({code: 200, body: {result: "OK"}});
    }

    login(id, password) {
        return new Promise((fulfill, reject) => {
            let signIn = "USE `GLHF`; SELECT COUNT(*) FROM Account where id = " + id + " AND password = '" + password +"';";
            console.log(signIn);
            db.query(signIn, function (err, result) {
                if(err) throw err;
                console.log(result[1][0]['COUNT(*)'] === 1);
                if(result[1][0]['COUNT(*)'] === 1){
                    fulfill({code: 200, body: {result: "OK"}});
                }else{
                    reject({code: 400, body: {error: "Invalid username/password."}});
                }
            });
        });

        // const data = fs.readFileSync("public/javascripts/accs.json", "utf-8");
        // const accs = JSON.parse(data);
        // console.log("Login:: " + id + " :: " + password);
        // if (accs[id] === password)
        //     return Promise.resolve({code: 200, body: {result: "OK"}});
        // return Promise.reject({code: 400, body: {error: "invalid username/password."}});
    }

    getUserInfo(accountID) {
        // const data = fs.readFileSync("public/javascripts/users.json", "utf-8");
        // const users = JSON.parse(data);
        // const user = Object.keys(users).find(key => users[key].includes(accountID));
        // const info = user + ":" + accountID + ":" + this.showOwnChampions(accountID);
        // return Promise.resolve({code: 200, body: {result: info}});


        return new Promise((fulfill, reject) => {
            let getUser = "USE `GLHF`; SELECT account.id, account.userID, user.name FROM Account JOIN user ON account.userID = user.id where account.id = " + accountID;
            console.log(getUser);
            db.query(getUser, function (err, result) {
                if (err) throw err;
                fulfill(result[1][0]);
            });
        }).then((data) => {
            return this.showOwnChampions(accountID, data);
        })
    }

    showOwnChampions(accountID, info) {
        return new Promise((resolve, reject) => {
            let ownChamp = "USE `GLHF`; SELECT champion.id, champion.name, champion.type FROM accownchamp JOIN champion ON accownchamp.champID = champion.id WHERE accownchamp.accID = " + accountID;
            console.log(ownChamp);
            db.query(ownChamp, function (err, result) {
                if (err) throw err;
                info.accownchamp = [];
                if(result[1][0]){
                    for(let i in result[1]){
                        info.accownchamp[i] = {};
                        info.accownchamp[i].champID = result[1][i].id;
                        info.accownchamp[i].champName = result[1][i].name;
                        info.accownchamp[i].type = result[1][i].type;
                    }
                    resolve({code: 200, body: {result: info}});
                }
                else {
                    resolve({code: 200, body: {result: info}});
                }
            });
        });


        // const data = fs.readFileSync("public/javascripts/hasChamp.json", "utf-8");
        // const accounts = JSON.parse(data);
        // if (!Object.keys(accounts).includes(accountID))
        //     return "null";
        // const champions = accounts[accountID];
        // if (champions.length === 0)
        //     return "null";
        // else {
        //     let champion = "";
        //     Object.keys(champions).forEach((index) => {
        //         let aChampion = champions[index];
        //         champion += index + "-" + aChampion[0] + "-" + aChampion[3] + "&";
        //     });
        //     return champion.slice(0, champion.length - 1);
        // }
    }

    deleteAccount(userID, accID, password) {
        return new Promise((resolve, reject) => {
            let delAcc = "USE `GLHF`; DELETE FROM account WHERE id = " + accID + " AND password = '" + password + "' AND userID = " + userID;
            console.log(delAcc);
            db.query(delAcc, function (err, result) {
                if(err) throw err;
                if(result[1].affectedRows === 0){
                    reject({code: 400, body: {error: "Invalid userID/username/password."}});
                }else{
                    resolve({code: 200, body: {result: "Succeeded."}});
                }
            });
        });

    //     console.log("Delete:: " + userID + " :: " + accID + " :: " + password);
    //     const data1 = fs.readFileSync("public/javascripts/accs.json", "utf-8");
    //     const accs = JSON.parse(data1);
    //     const data2 = fs.readFileSync("public/javascripts/users.json", "utf-8");
    //     const user = JSON.parse(data2);
    //     if (user[userID].includes(accID) && accs[accID] === password) {
    //         delete accs[accID];
    //         user[userID].splice(user[userID].indexOf(accID), 1);
    //         fs.writeFileSync("public/javascripts/accs.json", JSON.stringify(accs), "utf-8");
    //         fs.writeFileSync("public/javascripts/users.json", JSON.stringify(user), "utf-8");
    //         return Promise.resolve({code: 200, body: {result: "Succeeded."}});
    //     } else {
    //         return Promise.reject({code: 400, body: {error: "Fail to reset."}});
    //     }
    }

    resetPassword(userID, accID, old, newPWD) {
        return new Promise((resolve, reject) => {
            let reset = "USE `GLHF`; UPDATE account SET password = '" + newPWD + "' WHERE id = " + accID + " AND password = '" + old + "' AND userID = " + userID;
            console.log(reset);
            db.query(reset, function (err, result) {
                if(err) throw err;
                if(result[1].affectedRows === 0){
                    reject({code: 400, body: {error: "Invalid userID/username/password."}});
                }else{
                    resolve({code: 200, body: {result: "Succeeded."}});
                }
            });
        });

    //     console.log("ResetPassword:: " + userID + " :: " + accID + " :: " + newPWD);
    //     const data1 = fs.readFileSync("public/javascripts/accs.json", "utf-8");
    //     const accs = JSON.parse(data1);
    //     const data2 = fs.readFileSync("public/javascripts/users.json", "utf-8");
    //     const user = JSON.parse(data2);
    //     if (user[userID].includes(accID) && accs[accID] === old) {
    //         accs[accID] = newPWD;
    //         fs.writeFileSync("public/javascripts/accs.json", JSON.stringify(accs), "utf-8");
    //         return Promise.resolve({code: 200, body: {result: "Succeeded."}});
    //     } else {
    //         return Promise.reject({code: 400, body: {error: "Fail to reset."}});
    //     }
    }

    // TODO: saved the table "account plays games"
    selectGame(accountID, gameID) {
        return Promise.reject(null);
    }

    saveChampion(accountID, championID) {
        return new Promise((resolve, reject) => {
            let checkDuplicate = "USE `GLHF`; SELECT COUNT(*) FROM AccOwnChamp WHERE accID = " + accountID + " AND champID = " + championID;
            console.log(checkDuplicate);
            db.query(checkDuplicate, function (err, result) {
                if (err) throw err;
                if (result[1][0]['COUNT(*)'] === 1) {
                    reject({code: 400, body: {error: "You've already owned this champion."}});
                } else {
                    let save = "USE `GLHF`; INSERT INTO `AccOwnChamp` VALUES (" + accountID + ", " + championID + ")";
                    console.log(save);
                    db.query(save, function (err, result) {
                        if (err) throw err;
                        console.log(result);
                        if (result[1].affectedRows === 0) {
                            reject({code: 400, body: {error: "."}});
                        } else {
                            resolve({code: 200, body: {result: "Succeeded."}});
                        }
                    });
                }
            });

        })
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

    showChampionInfo(id) {
        return new Promise((resolve, reject) => {
            let champInfo = "USE `GLHF`; SELECT id, name, lane, type, stat FROM champion WHERE id = " + id ;
            console.log(champInfo);
            db.query(champInfo, function (err, result) {
                if (err) throw err;
                if (result[1][0]) {
                    resolve({code: 200, body: {result: result[1][0]}});
                }
                else {
                    reject({code: 400, body: {error: "Nothing is found."}});
                }
            });
        });
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

    showItemInfo(id) {
        return new Promise((resolve, reject) => {
            let itemInfo = "USE `GLHF`; SELECT id, name, stat, extraInfo FROM item WHERE id = " + id;
            console.log(itemInfo);
            db.query(itemInfo, function (err, result) {
                if (err) throw err;
                if (result[1][0]) {
                    resolve({code: 200, body: {result: result[1][0]}});
                }
                else {
                    reject({code: 400, body: {error: "Nothing is found."}});
                }
            });
        });

        // const data = fs.readFileSync("public/javascripts/items.json", "utf-8");
        // const items = JSON.parse(data);
        // console.log(items[id]);
        // let name = items[id][0].replace(/\s+/g, "-");
        // let result = id + "/" + name + "/";
        // let stat = "";
        // if (items[id][1].includes(",")) {
        //     stat = items[id][1].split(", ").join("&").replace(/\s+/g, "-").replace(/\+/g, "_").replace(/\%/g, "PERCENTAGE");
        // } else {
        //     stat = items[id][1].replace(/\s+/g, "-").replace(/\+/g, "_").replace(/\%/g, "PERCENTAGE");
        // }
        // result += stat + "/";
        // let extra = items[id][2].replace(/\s+/g, "-").replace(/\+/g, "_").replace(/\%/g, "PERCENTAGE");
        // result += extra;
        // console.log(result);
        // return Promise.resolve({code: 200, body: {result: result}});
    }

    // TODO: update all Champions in Database via api
    updateChampions(id, url, gameID) {
        return Promise.reject(null);
    }

    // TODO: update all Items in Database via api
    updateItems(id, url, gameID) {
        return Promise.reject(null);
    }

    suggestCI(championID) {
        return new Promise((resolve, reject) => {
            let suggestItem = "USE `GLHF`; SELECT Item.id, Item.name FROM Suggest JOIN Item ON Suggest.itemID = Item.id WHERE Suggest.champID = " + championID;
            console.log(suggestItem);
            db.query(suggestItem, function (err, result) {
                if (err) throw err;
                if (result[1][0]) {
                    resolve({code: 200, body: {result: result[1]}});
                }
                else {
                    reject({code: 400, body: {error: "Nothing is found."}});
                }
            });
        });
    }

    suggestAgainst(championA, championB) {
        return new Promise((resolve, reject) => {
            let suggestIS = "USE `GLHF`; SELECT AgainstSuggest.itemID, Item.name, Against.Strategy FROM AgainstSuggest " +
                "JOIN Item ON AgainstSuggest.itemID = item.id " +
                "JOIN Against ON AgainstSuggest.champ0ID = Against.champ0ID AND AgainstSuggest.champ1ID = Against.champ1ID " +
                "WHERE AgainstSuggest.champ0ID = " + championA + " AND AgainstSuggest.champ1ID = " + championB;
            console.log(suggestIS);
            db.query(suggestIS, function (err, result) {
                if (err) throw err;
                if (result[1][0]) {
                    resolve({code: 200, body: {result: result[1]}});
                }
                else {
                    reject({code: 400, body: {error: "Nothing is found."}});
                }
            });
        });
    }

    manageChamp(data){
        return new Promise((resolve, reject) => {
            let manage = "USE `GLHF`; SELECT " + data.choice + " FROM Champion";
            console.log(data);
            if(data.type){
                if (data.type[0] !== "all")
                    manage += " WHERE type LIKE '%" + data.type + "%'";
            }
            console.log(manage);
            db.query(manage, function (err, result) {
                if (err) throw err;
                if (result[1][0]) {
                    resolve({code: 200, body: {result: result[1]}});
                }
                else {
                    reject({code: 400, body: {error: "Nothing is found."}});
                }
            });
        });
    }

    whoOnlyOwnThis(cid){
        return new Promise((resolve, reject) => {
            let whoOnlyOwnThis = "USE `GLHF`; select id from account where not exists (select accID from accownchamp where accID = account.id and accownchamp.champID <> " + cid + ");";
            console.log(whoOnlyOwnThis);
            db.query(whoOnlyOwnThis, function (err, result) {
                if (err) throw err;
                if (result[1][0]) {
                    resolve({code: 200, body: {result: result[1]}});
                }
                else {
                    reject({code: 400, body: {error: "Nothing is found."}});
                }
            });
        });
    }

    userStats(data){
        return new Promise((resolve, reject) => {
            let operator = data.operator;
            let table ="(select account.userID, user.name, count(account.userid) as accountNum, sum(countChamp.count) as ChampNum, avg(countChamp.count) as avgNum from " +
                "(select accid, count(accid) as count from accownchamp group by accid) countChamp " +
                "join account on account.id = countChamp.accid " +
                "join user on account.userID = user.id group by account.userID) stat";
            if (operator !== '*')
                operator = " * from " + table + " WHERE avgNum=(select " + operator +  '(avgNum)';
            // let query = "USE `GLHF`; select " + operator + " from (select account.userID, user.name, count(account.userid) as accountNum, sum(countChamp.count) as ChampNum, avg(countChamp.count) as avgNum from " +
            //     "(select accid, count(accid) as count from accownchamp group by accid) countChamp " +
            //     "join account on account.id = countChamp.accid " +
            //     "join user on account.userID = user.id group by account.userID) stat";

            let query = "USE `GLHF`; select " + operator + " from " + table;
            if (data.operator !== "*")
                query += ")";
            db.query(query, function (err, result) {
                if (err) throw err;
                if (result[1][0]) {
                    resolve({code: 200, body: {result: result[1]}});
                }
                else {
                    reject({code: 400, body: {error: "Nothing is found."}});
                }
            });
        });
    }


    // TODO: show all users from Database
    allUsers() {
        return Promise.resolve({code: 200, body: {result: null}});
    }
}

module.exports = new GameBuildFacade();
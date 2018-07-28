let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let fs = require('fs');


const db = mysql.createConnection({
    host : '192.168.0.24',
    user :'gamebuild',
    password: '1234567',
    multipleStatements: true
});

//Connect
db.connect(function (err) {
    if(err) throw err;
    console.log('Database connected');
});


//Setup use SQL in archivedSQL
// const setups = ["glhf", "champions", "items", "suggestions", "against", "againstSuggest", "users", "accounts", "accOwnChamp"];
// setups.forEach((item) => {
//     const file = "public/data/" + item + ".sql";
//     db.query(fs.readFileSync(file).toString(), (err, result) => {
//         if (err) throw err;
//         console.log("Database " + item + " setup done.");
//     });
// });


let sql = fs.readFileSync('public/data/glhf.sql').toString();
db.query(sql, function (err, result) {
    if(err) throw err;
    console.log('Database basic setup done.');
});

const setups = ["Champion", "Item", "Suggest", "Against", "AgainstSuggest", "User", "Account", "AccOwnChamp"];
setups.forEach((setup) => {
    let content = JSON.parse(fs.readFileSync("public/data/" + setup + ".json").toString());
    let items = Object.values(content);
    let targetSQL = "USE `GLHF`;\n\n";
    items.forEach((item) => {
        targetSQL += "INSERT INTO `" + setup + "` VALUES (";
        let i = 0;
        for (i; i < item.length - 1; i++) {
            let temp = item[i];
            if (typeof temp === "number") {
                targetSQL += temp.toString() + ", ";
            } else if (typeof temp === "string") {
                targetSQL += "\"" + temp + "\", ";
            } else if (temp === null) {
                targetSQL += "null, ";
            }
        }
        let temp = item[i];
        if (typeof temp === "number") {
            targetSQL += temp.toString();
        } else if (typeof temp === "string") {
            targetSQL += "\"" + temp + "\"";
        } else if (temp === null) {
            targetSQL += "null";
        }
        targetSQL += ");\n";
    });
    db.query(targetSQL, (err, result) => {
       if (err) throw err;
       console.log("Database " + setup + " setup done.");
    });
});


router.get('/select',function (req, res, next) {
    db.query('SELECT * FROM Champion', function (err, result, fields) {
        if(err) throw err;
        res.send(result)
    })
});

router.get('/login', function (req, res, next) {
    db.query('SELECT ')
});

module.exports = router;

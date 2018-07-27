let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let fs = require('fs');


const db = mysql.createConnection({
    host : 'localhost',
    user :'root',
    password: 'password',
    multipleStatements: true
});

//Connect
db.connect(function (err) {
    if(err) throw err;
    console.log('Database connected');
});


//SetUp
const setups = ["glhf", "champions", "items", "suggestions", "against", "againstSuggest", "users", "accounts", "accOwnChamp"];
setups.forEach((item) => {
    const file = "public/sqls/" + item + ".sql";
    db.query(fs.readFileSync(file).toString(), (err, result) => {
        if (err) throw err;
        console.log("Database " + item + " setup done.");
    });
});
// let sql = fs.readFileSync('public/sqls/glhf.sql').toString();
// db.query(sql, function (err, result) {
//     if(err) throw err;
//     console.log('Database basic setup done.');
// });

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

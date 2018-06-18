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
let sql = fs.readFileSync('glhf.sql').toString();
db.query(sql, function (err, result) {
    if(err) throw err;
    console.log('Database setup done');
});

router.get('/', function (req, res, next) {
    let sql = fs.readFileSync('glhf.sql').toString();
    db.query(sql, function (err, result) {
        if(err) {
            console.log(err);
        }
        else res.send(result);
    })
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

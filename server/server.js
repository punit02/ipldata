var express = require('express');
var mysql = require('mysql');
var path = require('path');


const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../client') });

});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ppunit02@',
    database: 'iplmatches'
});

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('Mysql Connected');

});
function queryHandler(sql){
return new Promise((res,rej)=>{
    
    let query = db.query(sql, (err, result) => {
        if (err) 
        console.log(err);
        else
        res(result);
    });
})
}
app.get('/no-of-matches', (req, res) => {
    let sql = 'SELECT season,COUNT(*) as count FROM matches GROUP BY season ORDER BY season ASC';
    queryHandler(sql)
    .then(result=>{
        res.send(JSON.stringify(result)); 
    })
});

app.get('/no-win-matches', (req, res) => {
    let sql = 'select winner,count(winner) as wins ,season from matches group by winner,season order by season';
    queryHandler(sql)
    .then(result=>{
        res.send(JSON.stringify(result)); 
    })
});

app.get('/extra-runs', (req, res) => {
    let sql = 'select distinct batting_team, sum(extra_runs) AS Extrarun from deliveries where match_id IN (select id from matches where season=2016) Group by (batting_team)';
    queryHandler(sql)
    .then(result=>{
        res.send(JSON.stringify(result)); 
    })
});

app.get('/economic-bowler', (req, res) => {
    let sql = 'select distinct bowler,(sum(total_runs)/count(bowler)*6) as economy from deliveries where match_id IN (select id from matches where season=2015) group by(bowler) order by economy LIMIT 10';
    queryHandler(sql)
    .then(result=>{
        res.send(JSON.stringify(result)); 
    })
});




app.listen('3000', () => {
    console.log("server is running on port 3000");
});



































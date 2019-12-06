var express = require('express');
var http = require('http');
var app = express();

const SQL = require('sqlite3');
const sqliteJson = require("sqlite-json-export");
var database = new SQL.Database('./databases/Cendol.db');
var exporter = new sqliteJson(database);

// pinging
app.use(express.static(__dirname + '/public'));

app.set('json spaces', 2);
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/bots/api', function(req, res) {
  exporter.json(`SELECT * FROM main`, {key: "BotID"}, async function (err, rows) {
    let parse = JSON.parse(rows);
    res.json(parse);
  });
});
app.get('/join', function (req, res) {
  res.redirect("https://discord.gg/ERwBePJ")
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
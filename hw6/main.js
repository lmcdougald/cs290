var express = require('express');
var exphbs = require('express-handlebars');
var mysql = require('mysql2');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var hbs = exphbs.create({ defaultLayout: 'main.hbs'});
var args = process.argv;

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

var pool = mysql.createPool({
//    host  : '172.17.0.1',
    host  : args[2],
    user  : args[3],
    password: args[4],
    database: args[5]
});

app.set('port', 2880);

app.get('/reset-table', function(req, res, next)
{
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err)
    {
      context.results = "Table reset";
      res.render('home', context);
    })
  });
});


app.get('/insert',function(req, res, next){
    var context = {};
    pool.query("INSERT INTO workouts (`name`) VALUES (?)", [req.query.c], function(err, result)
    {
        if(err)
        {
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('home', context);
    });
});


app.get('/', function(req, res, next)
{
    var context = {};
    pool.query('SELECT * FROM workouts', function(err, rows, fields)
    {
        if(err){
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.render('home', context);
    });
});


app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function()
{
    console.log('Express @ http://localhost:' + app.get('port') + '; Ctrl-C to end');
});
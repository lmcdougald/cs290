var express = require('express');
var mysql = require('mysql2');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

var args = process.argv;

var pool = mysql.createPool({
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
            res.send(context);
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
        context.results = result.insertId;
        res.send(context);
    });
});


app.get('/simple-update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
    [req.query.name, req.query.done, req.query.due, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.send(context);
  });
});


app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.send(context);
      });
    }
  });
});


app.get('/show', function(req, res, next)
{
    var context = {};
    pool.query('SELECT * FROM workouts', function(err, rows, fields)
    {
        if(err){
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        context.prestring = rows;
        res.send(context);
    });
});



app.use(function(req,res){
    res.type('plain/text');
    res.status(404);
    res.send('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500');
});

app.listen(app.get('port'), function()
{
    console.log('Express @ http://localhost:' + app.get('port') + '; Ctrl-C to end');
});
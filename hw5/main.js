var express = require('express');
var exphbs = require('express-handlebars');
var app = express();

var hbs = exphbs.create({ defaultLayout: 'main.hbs'});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('port', 2990);

app.get('/', function(req, res)
{
    res.render('home');
});

app.listen(app.get('port'), function()
{
    console.log('Express @ http://localhost:' + app.get('port') + '; Ctrl-C to end');
});

var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var hbs = exphbs.create({ defaultLayout: 'main.hbs'});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('port', 2990);


//START hw-specific code
//generates a handlebars context from a request
function contextBuilder(req, isPost)
{
    var qParams = [];
    var context = {};
    
    context.isPost = isPost; //variable for the handlebars if statement

    //query code
    for (var p in req.query)
    {
        qParams.push({'name' : p, 'value' : req.query[p]})
    }
    context.queryList = qParams;

    //post code
    if (isPost) 
    {
        var pParams = [];
        for (var p in req.body)
        {
            pParams.push({'name':p,'value':req.body[p]});
        }
        context.postList = pParams;
    }
    
    return context;
}

//use the contextBuilder with "isPost = false"
app.get('/', function(req, res)
{
    var context = contextBuilder(req, false);
    res.render('home', context);
});

//use the contextBuilder with "isPost = true"
app.post('/', function(req,res)
{
    var context = contextBuilder(req, true);
    res.render('home', context);
});

//END hw-specific code

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

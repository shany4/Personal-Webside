var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var routes = require('./routes');
var users = require('./routes/user');
var SessionStore = require("session-mongoose")(express);
var store = new SessionStore({
url: "mongodb://localhost/session",
interval: 120000
});
//mongo 
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/ying');


var app = express();

// view engine setup
app.engine('.html', ejs.__express);

app.set('views', path.join(__dirname, 'views'));

app.set('view engine','html');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.cookieSession({secret : 'fens.me'}));
app.use(express.session({
secret : 'fens.me',
store: store,
cookie: { maxAge: 900000 }
}));
app.use(function(req, res, next){
res.locals.user = req.session.user;
next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//personal index
app.get('/', routes.index(db));

//management index
app.all('/admin',routes.checkLogin);
app.get('/admin',routes.admin(db));
app.post('/adminLogin',routes.adminLogin(db));

app.get('/login',routes.checkLogout);
app.get('/login',routes.login);

app.get('/adminLogout',routes.adminLogout);


app.get('/skill', routes.skill(db));
app.get('/addSkill', routes.addSkill);
app.post('/addSkillfunction',routes.addSkillfunction(db));

app.post('/skillupdate', routes.skillupdate(db));
app.get('/deleteSkill', routes.deleteSkill(db));


app.get('/poster', routes.poster(db));

app.get('/setPoster',routes.setPoster(db));
app.get('/updateContent',routes.updateContent(db));
app.post('/updateContentfunction', routes.updateContentfunction(db));

app.get('/content', routes.content(db));
app.get('/addContent', routes.addContent(db));
app.post('/addContentfunction',routes.addContentfunction(db));
app.get('/deleteContent', routes.deleteContent(db));


app.get('/classify', routes.classify(db));
app.get('/addClassify', routes.addClassify);
app.post('/addClassifyfunction',routes.addClassifyfunction(db));

app.post('/classifyupdate', routes.classifyupdate(db));
app.get('/deleteClassify', routes.deleteClassify(db));





app.get('/email', routes.email);


app.post('/sendMail', routes.sendMail);
app.get('/users', users.list);
app.get('/useradd', routes.newuser);
app.post('/useradd1',routes.adduser(db));
//test
app.get('/userlist', routes.userlist(db));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


//HTTPS
var https = require('https')
    ,fs = require("fs");

var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};

https.createServer(options, app).listen(3011, function () {
    console.log('Https server listening on port ' + 3011);
});

var express = require('express'),
    logger = require('morgan'),
    path = require('path')

var naverReplyHandler = require('./routes/crawling/naver_reply.js');
var dbHandler = require('./routes/mysql/connection.js');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(logger('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
}));

app.get('/reply/http*', naverReplyHandler.getReply);

app.get('/reply/redirect', function(req,res){
    res.render('reply_redirect', {message:'야호'});
});

app.get('/db', dbHandler.dbConnection);

app.get('/db/redirect', function(req,res){
    res.render('db_redirect', {message:'호이짜'});
});

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000);
//module.exports = app;

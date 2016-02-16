var express = require('express'),
    logger = require('morgan'),
    path = require('path')

var naverReplyHandler = require('./routes/crawling/naver_reply.js');
var naverArticleUrl = require('./routes/crawling/naver_article_url.js');
var naverLnbMenu = require('./routes/crawling/naver_lnb_menu.js');
var naverSubMenu = require('./routes/crawling/naver_sub_menu.js');
var dbHandler = require('./routes/mysql/connection.js');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/routes/ejs'));
app.use(logger('dev'));
app.use(logger('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
}));

app.get('/', function(req,res){
    console.log(__dirname);
    res.render('index');
});

//카테고리 분류
app.get('/lnb', naverLnbMenu.getUrl);

//카테고리의 서브 분류
app.get('/lnb/sub/http*', naverSubMenu.getUrl);

//타이틀 별 기사 분류
app.get('/lnb/sub/title/http*', naverArticleUrl.getUrl);

//기사별 댓글
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

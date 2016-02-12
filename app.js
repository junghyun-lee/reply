var express = require('express'),
    logger = require('morgan'),
    path = require('path');

var naverReplyHandler = require('./routes/crawling/naver_reply.js');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(logger('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
}));

app.get('/reply/*', naverReplyHandler.getReply);

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000);
//module.exports = app;

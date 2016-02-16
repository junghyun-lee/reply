/**
 * Created by leejunghyun on 16. 2. 16..
 */

try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}

exports.getContent = function(req, res) {
    var url = req.url.substring(9);
    console.log(url);
    var spooky = new Spooky({
            child: {
                transport: 'http'
            },
            casper: {
                logLevel: 'debug',
                verbose: true
            }
        },
        function (err) {
            if (err) {
                e = new Error('Failed to initialize SpookyJS');
                e.details = err;
                throw e;
            }

            spooky.start(url);

            spooky.then(function(){
                var list = this.evaluate(function () {
                    var rows = document.querySelectorAll('.nav > li');
                    var menu = [];
                    for (var i = 0, row; row = rows[i]; i++) {
                        var article = row.querySelector('a');

                        var obj = {};

                        obj['title'] = article.innerText;
                        obj['url'] = article.href;
                        menu.push(obj);
                    }
                    return menu;
                });
                //this.emit('test',list);
                this.emit('total',list);
            });

            spooky.run();
        });

    spooky.on('error', function (e, stack) {
        console.error(e);

        if (stack) {
            console.log(stack);
        }
    });

    spooky.on('test', function (test) {
        console.log(test);
    });

    spooky.on('total', function (data) {
        var d = JSON.stringify(data);
        res.render('lnb_article_redirect', {message:d});
        console.log(data);
    });

}


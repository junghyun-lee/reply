/*Created by leejunghyun on 16. 2. 13..*/
'use strict';
try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}
var mysql = require('mysql');
var dbHandler = require('../mysql/connection.js');

exports.getUrl = function(req, res) {

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

            spooky.start(
                'http://news.naver.com');

            spooky.then(function(){
                var list = this.evaluate(function () {
                    var rows = document.querySelectorAll('#lnb > ul > li');
                    var menu = [];
                    for (var i = 0, row; row = rows[i]; i++) {
                        var article_menu = row.querySelector('a');

                        var obj = {};

                        obj['title'] = article_menu.innerText;
                        obj['url'] = article_menu.href;
                        menu.push(obj);
                    }
                    return menu;
                });

                this.emit('test',list);
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
        res.redirect('http://localhost:3000/lnb/redirect?' + d);
        console.log(d);
    });
}


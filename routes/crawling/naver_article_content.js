/*Created by leejunghyun on 16. 2. 16..*/
'use strict';
try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}


exports.getContent = function(req, res) {
    var url = req.url.substring(17);
    var total_;
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

            spooky.start(url,function(){
                this.waitForSelector('.u_cbox_list');
            });

            spooky.then(function(){
                var total_count = this.evaluate(function(){ return document.querySelector('.u_cbox_count').innerText});
                total_ = total_count.replace(/\,/g,'');
            });

            spooky.then(function(){
                var count = total_ / 20;
                for(var i=0;i<count;i++) {
                    this.thenClick(".u_cbox_paginate a").then(function () {
                        var current = this.evaluate(function(){
                            return document.querySelector('.u_cbox_page_on.__cbox_page_current').innerText;
                        });
                        emit('test',current);
                        this.wait(500);
                    });
                }
            })

            spooky.then(function (){
                var list = this.evaluate(function () {
                    var rows = document.querySelectorAll('.u_cbox_list .u_cbox_text_wrap');
                    var jobs = [];

                    for (var i = 0, row; row = rows[i]; i++) {
                        var a = row.querySelector('.u_cbox_contents');
                        var l = a.parentElement.parentElement.parentElement.parentElement;

                        var obj = {};

                        obj['title'] = a.innerText;
                        obj['url'] = l.getAttribute('class').substring(36);
                        jobs.push(obj);
                    }
                    return jobs;
                });
                emit("total",list);
            });

            spooky.run();
        });

    spooky.on('error', function (e, stack) {
        console.error(e);

        if (stack) {
            console.log(stack);
        }
    });

    spooky.on('total', function (data) {
        var d = JSON.stringify(data);
        res.render('reply_redirect',{message:d});
        console.log(data);
    });
}


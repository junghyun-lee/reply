/**
 * Created by leejunghyun on 16. 2. 12..
 */
'use strict';
try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}

var fs = require('fs');

exports.getReply = function(req, res, next) {
    var url = req.url.substring(7);
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
                var title = this.evaluate(function () {
                    var rows = document.querySelectorAll('.u_cbox_list .u_cbox_text_wrap');
                    var jobs = [];

                    for (var i = 0, row; row = rows[i]; i++) {
                        var a = row.querySelector('.u_cbox_contents');
                        var l = a.parentElement.parentElement.parentElement.parentElement;

                        var job = {};

                        job['title'] = a.innerText;
                        job['url'] = l.getAttribute('class').substring(36);
                        jobs.push(job);
                    }
                    return jobs;
                });
                emit("hello",title);
                emit("fs",title);
            });

            spooky.run();
        });

    spooky.on('error', function (e, stack) {
        console.error(e);

        if (stack) {
            console.log(stack);
        }
    });

    spooky.on('hello', function (greeting) {
        res.redirect('http://localhost:3000/reply/redirect');
        //res.send(greeting);
        console.log(greeting);
    });
}


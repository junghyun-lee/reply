/**
 * Created by leejunghyun on 16. 2. 12..
 */
var mysql = require('mysql');

exports.dbConnection = function(req,res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database:'test'
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

    connection.query('select * from crawling',function(err,rows){
        console.log(rows);
        //res.json(rows);
    });



    res.redirect('http://localhost:3000/db/redirect');
}
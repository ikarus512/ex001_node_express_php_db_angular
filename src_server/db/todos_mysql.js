var fs = require('fs');
var path = require('path');
var mysql      = require('mysql');
var Todos = {};




Todos.process = function(req,res,json,user){
    var db = mysql.createConnection({
      host     : 'localhost',
      port     : 1233,
      user     : 'user1',
      password : 'password1',
      database : 'dbtodo'
    });

    db.connect();

    switch (json.action) {
        case "listTodos":
            var filter="";
            if(json.filter=="list done")   filter='WHERE done=true';
            if(json.filter=="list undone") filter='WHERE done=false';

            db.query("SELECT id,done,text FROM todos "+filter+" ORDER BY id;", function(err, rows, fields) {
              if (!err) {
                console.log('The solution is: ', JSON.stringify(rows));
                res.json({ "USER":user, "statusTxt":"Ok", "arr":rows });
              } else {
                console.log('Error while performing Query.');
                res.json({ "USER":user, "statusTxt":"Fail" });
              }
            });
        break;
        case "addTodo":
            db.query('INSERT INTO todos(text) VALUES("'+json.text+'");', function(err, rows, fields) {
              if (!err) {
                console.log('The solution is: ', JSON.stringify(rows));
                res.json({ "USER":user, "statusTxt":"Ok" });
              } else {
                console.log('Error while performing Query.');
                res.json({ "USER":user, "statusTxt":"Fail" });
              }
            });
        break;
        case "deleteTodo":
            db.query('DELETE FROM todos WHERE id='+json.num+';', function(err, rows, fields) {
              if (!err) {
                console.log('The solution is: ', JSON.stringify(rows));
                res.json({ "USER":user, "statusTxt":"Ok" });
              } else {
                console.log('Error while performing Query.');
                res.json({ "USER":user, "statusTxt":"Fail" });
              }
            });
        break;
        case "toggleTodo":
            console.log(" SELECT done FROM todos WHERE id="+json.num+";");
            db.query("SELECT done FROM todos WHERE id="+json.num+";", function(err, rows, fields) {
              if (!err) {
                console.log('The solution is: ', JSON.stringify(rows));
                var d = !rows[0].done ?  'true' : 'false';
                console.log(' new d=', d);
                console.log(" UPDATE todos SET done="+d+" WHERE id="+json.num+";");
                db.query("UPDATE todos SET done="+d+" WHERE id="+json.num+";", function(err, rows, fields) {
                  if (!err) {
                    console.log('The solution is: ', JSON.stringify(rows));
                    res.json({ "USER":user, "statusTxt":"Ok" });
                  } else {
                    console.log('Error while performing Query.');
                    res.json({ "USER":user, "statusTxt":"Fail" });
                  }
                });
              } else {
                console.log('Error while performing Query.');
                res.json({ "USER":user, "statusTxt":"Fail" });
              }
            });
        break;
        default:
             res.status(500).send();
        break;
    }
}

module.exports = Todos;

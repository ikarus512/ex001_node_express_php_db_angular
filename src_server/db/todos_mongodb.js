var fs = require('fs');
var path = require('path');
var Todos = {};
//var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url="mongodb://user1:password1@localhost:27017/dbtodo";

function circularJsonStringify(o){
  var cache = [];
  var str=JSON.stringify(o, function(key, value) {
      if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
          }
          // Store value in our collection
          cache.push(value);
      }
      return value;
  });
  cache = null; // Enable garbage collection
  return str;
}


Todos.process = function(req,res,json,user){

    switch (json.action) {
        case "listTodos":
            var filter={};
            if(json.filter=="list done")   filter={done:true};
            if(json.filter=="list undone") filter={done:false};

            MongoClient.connect(url, function(err, db) {
              if(err){ res.json({ "USER":user, "statusTxt":"Fail" }); return; }
              //assert.equal(null, err);
              //console.log("Connected correctly to server");

              db.collection('todos').find(filter).toArray(function(err, r) {
                if(err){ res.json({ "USER":user, "statusTxt":"Fail" }); return; }
                //assert.equal(null, err);
                console.log(' Found in mongodb: '+circularJsonStringify(r));
                db.close();
                res.json({ "USER":user, "statusTxt":"Ok", "arr":r });
              });
            });
        break;
        case "addTodo":
            MongoClient.connect(url, function(err, db) {
              if(err){ res.json({ "USER":user, "statusTxt":"Fail, could not connect to db" }); return; }
              db.collection('todos')
              .find({id:{$not:{$type:2}}})
              .sort({id:-1})
              .limit(1)
              .toArray(function(err, r) {
                if(err){ res.json({ "USER":user, "statusTxt":"Fail to add new todo '"+json.text+"'." }); return; }
                //console.log(' Found max id='+circularJsonStringify(r[0].id));
                db.collection('todos')
                .insertOne({id:r[0].id+1, done:false, text:json.text},function(err,r){
                  //assert.equal(null, err);
                  //assert.equal(1, r.insertedCount);
                  db.close();
                  if(err){res.json({ "USER":user, "statusTxt":"Fail to add new todo '"+json.text+"'." }); return;}
                  res.json({ "USER":user, "statusTxt":"Ok" });
                });
              });
            });
        break;
        case "deleteTodo":
            var id=Number(json.num);
            MongoClient.connect(url, function(err, db) {
              //assert.equal(null, err);
              //console.log("Connected correctly to server");
              //console.log("deleteTodo:");

              if(err){ res.json({ "USER":user, "statusTxt":"Fail" }); return;}
              db.collection('todos').deleteOne({id:id},function(err, r) {
                //assert.equal(null, err);
                //assert.equal(1, r.deletedCount);
                db.close();
                if(err || r.deletedCount==0){
                  res.json({ "USER":user, "statusTxt":"Failed to delete todo with id="+id });
                  return;
                }
                res.json({ "USER":user, "statusTxt":"Ok" });
              });
            });
        break;
        case "toggleTodo":
            var id=Number(json.num);
            MongoClient.connect(url, function(err, db) {
              if(err){ res.json({ "USER":user, "statusTxt":"Fail connect" }); return;}
              console.log("toggleTodo: id=",id);

              db.collection('todos')
              .find({id:id})
              .limit(1)
              .toArray(function(err, r) {
                if(err || r.length==0){
                  res.json({ "USER":user, "statusTxt":"Not found todo with id="+id });
                  return;
                }
                console.log(" r=",circularJsonStringify(r));

                db.collection('todos')
                .findOneAndUpdate({id:id},{$set:{done:!Boolean(r[0].done)}},function(err, r) {
                  if(err){ res.json({ "USER":user, "statusTxt":"Failed toggle todo with id="+id }); return;}
                  //assert.equal(null, err);
                  //assert.equal(1, r.deletedCount);
                  db.close();
                  res.json({ "USER":user, "statusTxt":"Ok" });
                });
              });
            });
        break;
        default:
            res.status(500).send();
        break;
    }
}

module.exports = Todos;

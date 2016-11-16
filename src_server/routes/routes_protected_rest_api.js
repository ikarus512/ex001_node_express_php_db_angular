var express = require('express');
var extend = require('extend');
var router = express.Router();
var path            = require('path');

//var Todos = require(path.join(__dirname, '../db/todos_memory.js'));
var Todos = require(path.join(__dirname, '../db/todos_file.js'));
//var Todos = require(path.join(__dirname, '../db/todos_mysql.js'));
//var Todos = require(path.join(__dirname, '../db/todos_mongodb.js'));


router.post('/todo_rest_api', function(req, res){
    Todos.process(req.body,req.session.user.id,function onSuccess(data){res.json(data);});
});


// Backbone-compatible REST API:
/*
//  METHOD|  url              |params |=> action, expected response    |BB func
//  ------+-------------------+-------+--------------------------------+-------
//  GET   |/todo_rest_api2    |{}     |=> return array of todos        |coll.fetch()
//  POST  |/todo_rest_api2    |newTodo|=> add newTodo, ret todo with id|coll.create()
//  PUT   |/todo_rest_api2/:id|aTodo  |=> update aTodo at id, return {}|model.save()
//  DELETE|/todo_rest_api2/:id|{}     |=> delete todo at id            |model.destroy()
*/
router.get('/todo_rest_api2', function(req, res){ // return whe whole list
    Todos.get_all(req.body,req.session.user.id,function onSuccess(data){res.json(data);});
});
router.post('/todo_rest_api2', function(req, res){ // add new item
    Todos.post_add_new(req.body,req.session.user.id,function onSuccess(data){res.json(data);});
});
router.put('/todo_rest_api2/:id', function(req, res){ // update item
    Todos.put_update_one(req.body,req.session.user.id,function onSuccess(data){res.json(data);});
});
router.delete('/todo_rest_api2/:id', function(req, res){
    Todos.delete_one({id:req.params.id},req.session.user.id,function onSuccess(data){res.json(data);});
});


module.exports = router;

var express = require('express');
var extend = require('extend');
var router = express.Router();
var path = require('path');
var routes_protected_rest_api = require(path.join(__dirname, 'routes_protected_rest_api.js'));
var greet = require(path.join(__dirname, 'greet.js'));



router.get('/protected_page', function(req, res){
    res.render('protected_page', greet(req,{id: req.session.user.id}));
});
router.get('/todos_jquery_view', function(req, res){
    res.render('todos_jquery_view', greet(req,{id: req.session.user.id}));
});
router.get('/todos_backbone_view', function(req, res){
    res.render('todos_backbone_view', greet(req,{id: req.session.user.id}));
});
router.get('/todos_react_view', function(req, res){
    res.render('todos_react_view', greet(req,{id: req.session.user.id}));
});
router.get('/todos_angular_view', function(req, res){
    res.render('todos_angular_view', greet(req,{id: req.session.user.id}));
});

router.use('/', routes_protected_rest_api);

module.exports = router;

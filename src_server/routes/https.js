var express = require('express');
var router = express.Router();
var path = require('path');
var routes_protected = require(path.join(__dirname, 'routes_protected.js'));
//var Users = require(path.join(__dirname, '../db/users_memory.js'));
var Users = require(path.join(__dirname, '../db/users_file.js'));
var greet = require(path.join(__dirname, 'greet.js'));


// Debug request:
router.use('*', function(req, res, next){
    console.log('request: meth='+req.method
        //+', url='+req.url     //always '/' for .use('*'')
        +', url='+req.params['0']
        //+', params='+JSON.stringify(req.params)   //in case '/path/:id'
        +', data='+JSON.stringify(req.body)
    );
    next();
});

router.all('/', function(req, res){
    res.render('home',greet(req));
});




router.get('/signup', function(req, res){
    res.render('signup',greet(req));
});

router.post('/signup', function(req, res){
    if(!req.body.id || !req.body.password){
        res.status("400");
        res.send("Invalid details!");
    }
    else
    {
        if(Users.signup(req.session,req.body.id,req.body.password)) {
            res.redirect('/protected_page');
        } else {
            res.render('signup', greet(req,{errmessage:'User Already Exists! Login or choose another user id.'}));
        }
    }
});


router.get('/login', function(req, res){
    res.render('login',greet(req));
});

router.post('/login', function(req, res){
    if(!req.body.id || !req.body.password){
        res.render('login', greet(req,{errmessage:'Please enter both id and password'}));
    }
    else
    {
        if(Users.login(req.session,req.body.id,req.body.password)) {
            //res.redirect('/protected_page');
            //res.redirect('/todos.htm');
            res.redirect('/todos_jquery_view');
        } else {
            res.render('login', greet(req,{errmessage:'Invalid credentials!'}));
        }
    }
});



router.get('/logout', function(req, res){
    req.session.destroy(function(){
        console.log("User logged out.")
    });
    res.redirect('/');
});




function checkSignIn(req, res, next){
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        res.render('home',greet(req,{errmessage:'Error: please login.'}));
    }
}
router.use('/', checkSignIn, routes_protected);


router.all('*', function(req, res){
    res.render('home',greet(req,{errmessage:'Error: no such page ('+req.url+').'}));
});

module.exports = router;

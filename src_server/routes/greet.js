var extend = require('extend');

function greet(req,msg){
    var o={};
    if(req.session.user) {
        extend(o,{
            greeting : 'Hi, '+req.session.user.id+'!',
            id       : req.session.user.id
        });
    } else {
        o.greeting='(Not logged in.)';
    }
    extend(o,msg);
    return o;
}

module.exports = greet;

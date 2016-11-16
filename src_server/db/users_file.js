var fs = require('fs');
var path = require('path');
var f = path.join(__dirname, '/users_db_file.txt');


var Users = {};


Users.save=function(users){
  var data=JSON.stringify(users);
  fs.writeFile(f, data, (err) => {
    if (err) throw err;
    //console.log(f+' saved: '+data);
  });
};
Users.load=function(){
  try{
    return JSON.parse(fs.readFileSync(f)); // ! Synchronous read!
  } catch (err) {
    console.log(err);
    return [];
  }
};


Users.login=function(req_session,id,password){
  var login_ok=false;
  var users=this.load();
  console.log('loaded users:');
  console.log(JSON.stringify(users));
  users.filter(function(user){
    if(user.id === id && user.password === password){
        req_session.user = {id:id,password:password};
        login_ok=true;
    }
  })
  return login_ok;
};

Users.signup=function(req_session,id,password){
  var users=this.load();
  var i=users.findIndex(function(user){ return user.id === id; });

  try {
    if(i>=0) {
        return false;
    } else {
        var newUser = {id: id, password: password};
        users.push(newUser);
        req_session.user = newUser;

        this.save(users);

        return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = Users;

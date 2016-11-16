var Users = {};

Users.users=[{id:"u",password:"u"},{id:"tester",password:"tester"}];

Users.login=function(req_session,id,password){
  var login_ok=false;
  this.users.filter(function(user){
    if(user.id === id && user.password === password){
        req_session.user = {id:id,password:password};
        login_ok=true;
    }
  })
  return login_ok;
};

Users.signup=function(req_session,id,password){
  var i=this.users.findIndex(function(user){ return user.id === id; });
  if(i>=0) {
      return false;
  } else {
      var newUser = {id: id, password: password};
      this.users.push(newUser);
      req_session.user = newUser;
      return true;
  }
};

module.exports = Users;

var fs = require('fs');
var path = require('path');
var extend = require('extend');

var Todos = {};

Todos.save=function(arr,user,onSuccess,onError){
  var f=__dirname+'/todos_db.'+user+'.txt';
  var data=JSON.stringify(arr);
  data=data.replace(/\{/g, '\n{');//pretty output
  fs.writeFile(f,data,function(err){
    if (err) console.log('load err: '+err+' returning empty data');
    onSuccess();
  });
};

Todos.load=function(user,onSuccess,onError){
  var f=__dirname+'/todos_db.'+user+'.txt';
  fs.readFile(f, function(err, data){
    if (err) {
        //console.log('load err: '+err+' returning empty data');
        onSuccess([]);
    } else {
        onSuccess(JSON.parse(data));
    }
  });
};

Todos.empty=function(user,onSuccess,onError){
    //var f=__dirname+'/todos_db.'+user+'.txt';
    this.save([],user,function(){
        onSuccess([]);
    });
};



Todos.get_all = function(json,user,onSuccess,onError){
    this.load(user,function(arr){
      onSuccess(arr);
    });
}
Todos.post_add_new = function(todo,user,onSuccess,onError){
    var self=this;
    this.load(user,function(arr){
        var new_id=0;
        if(arr.length){
            var max_id=arr.sort(function(a,b){return b.id-a.id;})[0].id;
            new_id=max_id+1;
        }
        var newTodo={};
        extend(newTodo,todo,{id:new_id});
        arr.push(newTodo);
        self.save(arr,user,function(){
            onSuccess(newTodo);
        });
    });
}
Todos.put_update_one = function(json,user,onSuccess,onError){
    var self=this;
    this.load(user,function(arr){
        arr=arr.filter(function(todo){
          if(todo.id==json.id){
            todo.text = json.text;
            todo.done = json.done;
          }
          return true;
        });
        self.save(arr,user,function(){
            onSuccess({});
        });
    })
}
Todos.delete_one = function(json,user,onSuccess,onError){
    var self=this;
    this.load(user,function(arr){
        arr=arr.filter(function(todo){
          return todo.id!=json.id;
        });
        self.save(arr,user,function(){
            onSuccess({});
        });
    })
}

Todos.process = function(json,user,onSuccess,onError){
    var self=this;
    switch (json.action) {
        case "listTodos":
            this.load(user,function(arr){
                var a=[];
                switch (json.filter) {
                    case "list done":   a=arr.filter(function(todo) {return todo.done;}); break;
                    case "list undone": a=arr.filter(function(todo) {return !todo.done;}); break;
                    case "list all":
                    default:            a=arr; break;
                }
                onSuccess( { "USER":user, "statusTxt":"Ok", "arr":a } );
            })
            break;
        case "addTodo":
            this.load(user,function(arr){
                var new_id=0;
                if(arr.length){
                    var max_id=arr.sort(function(a,b){return b.id-a.id;})[0].id;
                    new_id=max_id+1;
                }
                var newTodo={text:json.text,id:new_id,done:false};
                arr.push(newTodo);
                self.save(arr,user,function(){
                    onSuccess( { "USER":user, "statusTxt":"Ok" } );
                });
            });
            break;
        case "deleteTodo":
            this.load(user,function(arr){
                arr=arr.filter(function(todo){return todo.id!=json.num;});
                self.save(arr,user,function(){
                    onSuccess( { "USER":user, "statusTxt":"Ok" } );
                });
            });
            break;
        case "toggleTodo":
            this.load(user,function(arr){
                arr=arr.filter(function(todo){if(todo.id==json.num){todo.done=!todo.done;} return true;});
                self.save(arr,user,function(){
                    onSuccess( { "USER":user, "statusTxt":"Ok" } );
                });
            });
            break;
        //default:
            //res.status(500).send();
            //break;
    }
}

module.exports = Todos;

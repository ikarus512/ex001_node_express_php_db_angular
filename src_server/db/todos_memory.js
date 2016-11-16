var Todos = {};

var arr = [
    {"id":0,"done":false,"text":"wethw rth wrth"},
    {"id":20,"done":false,"text":"wethw rth wrth"},
    {"id":30,"done":true,"text":"wethw rth wrth"},
    {"id":50,"done":false,"text":"wethw rth wrth"},
    {"id":51,"done":false,"text":"1212"}
];

Todos.process = function(req,res,json,user){
    switch (json.action) {
        case "listTodos":
            var a=[];
            switch (json.filter) {
                case "list all":    a=arr; break;
                case "list done":   a=arr.filter(function(todo) {return todo.done;}); break;
                case "list undone": a=arr.filter(function(todo) {return !todo.done;}); break;
            }
            res.json( { "USER":user, "statusTxt":"Ok", "arr":a } );
        break;
        case "addTodo":
            var max_id=arr.sort(function(a,b){return b.id-a.id;})[0].id;
            console.log('id=',max_id);
            arr.push({text:json.text,id:max_id+1,done:false});
            res.json( { "USER":user, "statusTxt":"Ok" } );
        break;
        case "deleteTodo":
            arr=arr.filter(function(todo){return todo.id!=json.num;});
            res.json( { "USER":user, "statusTxt":"Ok" } );
        break;
        case "toggleTodo":
            arr=arr.filter(function(todo){if(todo.id==json.num){todo.done=!todo.done;} return true;});
            res.json( { "USER":user, "statusTxt":"Ok" } );
        break;
        default:
            res.status(500).send();
        break;
    }
}

module.exports = Todos;

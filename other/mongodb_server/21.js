//use dbtodo
db.todos.find({},{"_id":0})    //list all
db.todos.insert({"id":0, "done":false,"text":"wrgwetwe"})
db.todos.insert({"id":2, "done":false,"text":"wrgwetwe"})
db.todos.insert({"id":3, "done":true,"text":"wrgwetwe"})
db.todos.insert({"id":4, "done":true,"text":"wrgwetwe"})
db.todos.insert({"id":6, "done":false,"text":"wrgwetwe"})
db.todos.insert({"id":7, "done":true,"text":"wrgwetwe"})
db.todos.find({"done":true},{"_id":0})   //list undone


//use dbtodo
//db.todos.find({},{"_id":0})    //list all
//db.todos.find({"done":true},{"_id":0})   //list undone
//db.todos.insert({"id":1,"text":"wrgwetwe"})
//db.todos.find({},{"_id":0})   //list undone
db.todos.find({},{"_id":0});
db.todos.find({},{"id":1,"_id":0}).sort({"id":-1}).limit(1)

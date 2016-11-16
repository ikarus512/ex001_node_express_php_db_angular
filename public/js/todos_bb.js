'use strict';

var app = {};


//--------------
// Main app template
//--------------
app.appMainElementId='#todoapp';
app.template0=""
  +"<div id='header'>"
  +"  <h1>Todos backbone</h1>"
  +"  <input id='new-todo' placeholder='What needs to be done?' autofocus>"
  +"    <div>"
  +"      <a href='#/'>show all</a> /"
  +"      <a href='#/pending'>show pending</a> /"
  +"      <a href='#/completed'>show completed</a>"
  +"    </div>"
  +"</div>"
  +"<div id='main'>"
  +"  <ul id='todo-list' style='list-style-type:none;'>"
  +"  </ul>"
  +"</div>";
$(app.appMainElementId).html(_.template(app.template0)());




//--------------
// Models
//--------------
app.Todo = Backbone.Model.extend({
  defaults: {
    text: '',
    done: false
  },
  toggle: function(){
    this.save({ done: !this.get('done')}); // REST API: sends HTTP PUT to /todos/:id
  }
});

//--------------
// Collections
//--------------
app.TodoList = Backbone.Collection.extend({
  model: app.Todo,

  // Storage:
  //localStorage: new Store("backbone-todo")
  url: '/todo_rest_api2', // REST API url

  //comparator: function(a,b) { return a.id > b.id; } // sort
  sort_key: 'id', // default sort key
  comparator: function(item) { return item.get(this.sort_key); },
  sortByField: function(fieldName) {this.sort_key = fieldName; this.sort(); },

  //filters
  completed: function() {
    return this.filter(function( todo ) {
      return todo.get('done');
    });
  },
  remaining: function() {
    return this.without.apply( this, this.completed() );
  }
});

// instance of the Collection
app.todoList = new app.TodoList();

//--------------
// Views
//--------------

// TodoView template
app.template1=""
  +"<div class='view'>"
  +"  <label><%- id %>:</label>"
  +"  <input class='toggle' type='checkbox' <%= done ? 'checked' : '' %>>"
  +"  <label id='label'><%- text %></label>"
  +"  <input class='edit' value='<%- text %>'>" //type="text" by default
  +"  <button class='destroy'>remove</button>"
  +"</div>";

// renders individual todo items list (li)
app.TodoView = Backbone.View.extend({
  tagName: 'li',
  //template: _.template($('#item-template').html()),
  template: _.template(app.template1),
  render: function(){
      var m=this.model.toJSON();
      if(!m.id) m.id='xx';
      this.$el.html(this.template(m));
      //this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit');
    this.label = this.$('#label');
    this.modeEditOff();
    return this; // enable chained calls
  },
  modeEditOn:  function() {this.input.css("display","inline"); this.label.css("display","none");  },
  modeEditOff: function() {this.input.css("display","none");   this.label.css("display","inline");},
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM.
  },      
  events: {
    'dblclick label': 'edit',
    'keyup .edit'   : 'updateOnEnterOrEscape',
    'blur .edit'    : 'closeUnsaved',
    'click .toggle' : 'toggleCompleted',
    'click .destroy': 'destroy'
  },
  edit: function(){
    this.modeEditOn();
    this.input.focus();
  },
  closeUnsaved: function(){
    this.input.val(this.label.html());
    this.modeEditOff();
  },
  closeSaved: function(){
    var value = this.input.val().trim();
    if(value) {
      this.model.save({text: value}); // REST API: sends HTTP PUT to /todos/:id
      // also triggers 'change' => this.render() reloads new model
    }
    this.modeEditOff();
  },
  updateOnEnterOrEscape: function(e){
    switch(e.which) {
      case 13: this.closeSaved();   break;
      case 27: this.closeUnsaved(); break;
    }
  },
  toggleCompleted: function(){
    this.model.toggle(); // REST API
  },
  destroy: function(){
    this.model.destroy(); // REST API
  }      
});




// renders the full list of todo items calling TodoView for each one.
app.AppView = Backbone.View.extend({
  el: '#todoapp',
  initialize: function () {
    this.input = this.$('#new-todo');
    app.todoList.on('add', this.addAll, this);
    app.todoList.on('reset', this.addAll, this);
    app.todoList.fetch(); // REST API: metod GET to url to get whole array of models
  },
  events: {
    'keypress #new-todo': 'createTodoOnEnter'
  },
  createTodoOnEnter: function(e){
    if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
      return;
    }
    app.todoList.create(this.newAttributes()); // REST API: sends HTTP POST to /todos (add new todo)
    this.input.val(''); // clean input box
  },
  addOne: function(todo){
    var view = new app.TodoView({model: todo});
    $('#todo-list').append(view.render().el);
  },
  addAll: function(){
    this.$('#todo-list').html(''); // clean the todo list
    //app.todoList.each(this.addOne, this);

    // filter todo item list
    switch(app.filter){
    case 'pending':
       _.each(app.todoList.remaining(), this.addOne);
       break;
    case 'completed':
       _.each(app.todoList.completed(), this.addOne);
       break;
    default:
       app.todoList.each(this.addOne, this);
       break;
    }
  },
  newAttributes: function(){
    return {
      text: this.input.val().trim(),
      done: false
    }
  }
});

app.Router = Backbone.Router.extend({
  routes: {
    '*filter' : 'setFilter'
  },
  setFilter: function(params) {
    console.log('app.router.params = ' + params); // just for didactical purposes.
    app.filter = params.trim() || '';
    app.todoList.trigger('reset');
  }
});

//--------------
// Initializers
//--------------   

app.router = new app.Router();
Backbone.history.start();
app.appView = new app.AppView(); 

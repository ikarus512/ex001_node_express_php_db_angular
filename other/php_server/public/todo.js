"use strict";
var app={};

window.onload=function(){
  app.phpaddr="http://localhost:8000/rest/todo.php";
  app.filter="list all";

  app.listTodos = function (filter) {
    app.filter = filter;
    $.ajax({type:'POST', url:app.phpaddr, dataType:'json', data:JSON.stringify({action:"listTodos",filter:filter}) })
    .done( function( data ) {
      $("#todosview1").empty();
      $.each(data.arr,function(index,item){
          $('<div/>', {'class': 'div'})
          .append( $('<label/>', {'html': item.id+":"}) )
          .append( item.done
            ? "<input type='checkbox' checked onclick='return false'></input>"
            : "<input type='checkbox'         onclick='return false'></input>" )
          .append( $('<label/>', {'html': item.text}) )
          .append("<br>")
          .appendTo('#todosview1');
      });
      //$("#todosview2").html(data.statusTxt);
      //$("#todosview2").html(JSON.stringify(data));
      $("#todosview3").html("Hi, "+data.USER+"!");
      $("#todosview4").html("Listing status: "+data.statusTxt);

      $("*").attr("tabindex",-1);
      $("#mySelect").attr("tabindex",1);
      $("#addTodo").attr("tabindex",2);
      $("#deleteTodo").attr("tabindex",3);
      $("#toggleTodo").attr("tabindex",4);
      $("#logoffButton").attr("tabindex",5);
    });
  }

  app.addTodo = function (text) {
    $.ajax({type:'POST', url:app.phpaddr, dataType:'json', data:JSON.stringify({action:"addTodo",text:text}) })
    .done( function( data ) {
      $("#todosview2").html(data.statusTxt);
    });
  }

  app.deleteTodo = function (num) {
    $.ajax({type:'POST', url:app.phpaddr, dataType:'json', data:JSON.stringify({action:"deleteTodo",num:num}) })
    .done( function( data ) {
      $("#todosview2").html(data.statusTxt);
    });
  }

  app.toggleTodo = function (num) {
    $.ajax({type:'POST', url:app.phpaddr, dataType:'json', data:JSON.stringify({action:"toggleTodo",num:num}) })
    .done( function( data ) {
      $("#todosview2").html(data.statusTxt);
    });
  }

  app.sendLogoff = function () {
    $.ajax({type:'POST', url:app.phpaddr, dataType:'json', data:JSON.stringify({action:"logoff"}) })
    .done( function( data ) {
      $("#todosview1").empty();
      $("#todosview2").empty();
      $("#todosview3").empty();
    });
  }

  $('#mySelect').change( function ( evt ) {
    app.filter=$(this).val();
    app.listTodos(app.filter);
  });

  $('#addTodo').on( 'keyup', function ( evt ) {
    var $val=$(this).val().trim();
    if( (evt.which === 13) && ($val!=="") ) {
        app.addTodo( $val );
        $(this).val("");
        app.listTodos(app.filter);
    }
  });

  $('#deleteTodo').on( 'keyup', function ( evt ) {
    var $val=$(this).val().trim();
    if( (evt.which === 13) && ($val!=="") ) {
        app.deleteTodo( $val );
        app.listTodos(app.filter);
    }
  });

  $('#toggleTodo').on( 'keyup', function ( evt ) {
    var $val=$(this).val().trim();
    if( (evt.which === 13) && ($val!=="") ) {
        app.toggleTodo( $val );
        app.listTodos(app.filter);
    }
  });

  $('#logoffButton').on( 'click', function ( evt ) {
    app.sendLogoff();
  });

  app.listTodos(app.filter);
}

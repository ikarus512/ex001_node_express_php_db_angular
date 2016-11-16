"use strict";

var app={};

app.phpaddr="/todo_rest_api";
app.filter="list all";

app.listTodos = function (filter) {
  app.filter = filter;
  $.ajax({type:'POST', url:app.phpaddr, dataType:'json', data:{action:"listTodos",filter:filter} })
  .done( function( data ) {
    $("#todosview1").empty();
    data.arr=data.arr.sort(function(a, b){return a.id>b.id});
    $.each(data.arr,function(index,item){
        $('<div/>')
        .append( $('<label/>', {'html': item.id+":"}) )
        .append( item.done
          ? "<input type='checkbox' checked onclick='return false'></input>"
          : "<input type='checkbox'         onclick='return false'></input>" )
        .append( $('<label/>', {'html': item.text}) )
        .append("<br>")
        .appendTo('#todosview1');
    });
    //$("#todosview2").html(data.statusTxt);
    /**/ //$("#todosview2").html(JSON.stringify(data));
    $("#todosview3").html("Hi, "+data.USER+"!");
    $("#todosview4").html("Listing status: "+data.statusTxt);

    $("*").removeAttr("tabindex");
    $("#mySelect").attr("tabindex",1);
    $("#addTodo").attr("tabindex",2);
    $("#deleteTodo").attr("tabindex",3);
    $("#toggleTodo").attr("tabindex",4);
    $("#username").html(data.USER);
  });
}

app.addTodo = function (text) {
  $.ajax({type:'POST', url:app.phpaddr, dataType:'json', data:{action:"addTodo",text:text} })
  .done( function( data ) {
    $("#todosview2").html(data.statusTxt);
    app.listTodos(app.filter);
  });
}

app.deleteTodo = function (num) {
  $.ajax({type:'POST', url:app.phpaddr, dataType:'json', data:{action:"deleteTodo",num:num} })
  .done( function( data ) {
    $("#todosview2").html(data.statusTxt);
    app.listTodos(app.filter);
  });
}

app.toggleTodo = function (num) {
  $.ajax({type:'POST', url:app.phpaddr, dataType:'json', data:{action:"toggleTodo",num:num} })
  .done( function( data ) {
    $("#todosview2").html(data.statusTxt);
    app.listTodos(app.filter);
  });
}



$('#mySelect').change( function ( evt ) {
  app.filter=$(this).val();
  app.listTodos(app.filter);
});

$('#addTodo').on( 'keyup', function ( evt ) {
  var val=$(this).val().trim();
  if( (evt.which === 13) && (val!=="") ) {
      app.addTodo( val );
      $(this).val("");
  }
  if( evt.which === 27 ) {
      $(this).val("");
  }
});

$('#deleteTodo').on( 'keyup', function ( evt ) {
  var $val=$(this).val().trim();
  if( (evt.which === 13) && ($val!=="") ) {
      app.deleteTodo( $val );
  }
});

$('#toggleTodo').on( 'keyup', function ( evt ) {
  var $val=$(this).val().trim();
  if( (evt.which === 13) && ($val!=="") ) {
      app.toggleTodo( $val );
  }
});

app.listTodos(app.filter);

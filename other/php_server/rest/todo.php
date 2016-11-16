<?php

//error_log('msg');


if($_SERVER['REQUEST_METHOD'] == 'POST'){
  require('todo_db_file.php');
//  require('todo_db_mysql.php');
//  require('todo_db_mongodb.php');

  //error_log("Path=" . json_encode($_SERVER)); //['PATH_INFO']
  //$request_url = explode('/', trim($_SERVER['PATH_INFO'],'/'));

  $json = json_decode(file_get_contents('php://input'),true); // Parameters of the request.

  switch($json{'action'}) {
  case 'listTodos':
    $res = listTodos($json);
    break;
  case 'addTodo':
    $res = addTodo($json);
    break;
  case 'deleteTodo':
    $res = deleteTodo($json);
    break;
  case 'toggleTodo':
    $res = toggleTodo($json);
    break;
  case 'logoff':
    $res = logoff($json);
    break;
  default:
    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'statusTxt'}='ERROR: Incorrect request';
    //require('todo_toggle_todo.php');
    break;
  }

  echo json_encode($res);
}

function validate_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>

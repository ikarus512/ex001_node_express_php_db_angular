<?php
//error_log(json_encode($_SERVER));

  my_authenticate(); // First, login.
  $access = my_resource_access(); // Then, provide access to server resources.
  return $access;



function my_resource_access() {
  if(
    preg_match( '/(?:^\/*public\/index.htm$)'
               .'|(?:^\/*rest\/todo.php$)'
               .'|(?:^\/*public\/todo.js$)'
               .'|(?:^\/*public\/libs\/*)/'
               ,$_SERVER{'REQUEST_URI'})
  ) {
    return false; // allow to return originally requested resource
  } else {
    echo 'Page not found: '.$_SERVER{'REQUEST_URI'};
    return true; // protect resource
  }
}

function my_authenticate() {
  session_start();
  if ( !isset($_SESSION['firstauthenticate']) ) {
    $_SESSION['firstauthenticate']=1;
    unset($_SERVER{'PHP_AUTH_USER'});
    unset($_SERVER{'PHP_AUTH_PW'});
  }
  $user=$_SERVER{'PHP_AUTH_USER'};
  $pass = $_SERVER{'PHP_AUTH_PW'};
  $valid_passwords = array ('u' => 'u');
  //$valid_passwords = array ('user' => 'user');
  $valid_users = array_keys($valid_passwords);
  $validated = (isset($_SERVER{'PHP_AUTH_USER'}) && in_array($user, $valid_users)) && ($pass === $valid_passwords[$user]);
  if (!$validated) {
    header('WWW-Authenticate: Basic realm="My Realm"');
    header('HTTP/1.0 401 Unauthorized');
    //header('Status: 401 Access Denied'); 
    echo 'Text if Cancel pressed: user='.$_SERVER{'PHP_AUTH_USER'}.' pw='.$_SERVER{'PHP_AUTH_PW'};
    exit;
  }
}

?>

<?php
// Uncomment these lines in php.ini file:
//      extension=php_mysql.dll
//      extension=php_pdo_mysql.dll
//      extension_dir="C:\1\to_del\_books\Programming\PHP\PHP5\ext"

define('dburi','mysql:host=localhost:1233; dbname=dbtodo;');
define('username','user1');
define('password','password1');

function listTodos($json)
{
    $a = array('list all'=>'', 'list done'=>'WHERE done=true', 'list undone'=>'WHERE done=false');
    $filter = $a{$json['filter']};

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'statusTxt'}='OK';
    $res{'arr'}=[];

    try {
        $conn = new PDO(dburi, username, password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $result = $conn->prepare("SELECT id,done,text FROM todos $filter ORDER BY id;");
        $result->execute();
        $j=$result->fetchAll();
        $conn = null;

        foreach ($j as $index=>$item) {
            array_push($res{'arr'}, array ('id'=>intval($item{'id'}), 'done'=>boolval($item{'done'}), 'text'=>$item{'text'}));
        }

        $res['statusTxt'] = 'OK';
    } catch(PDOException $e) {
        $res['statusTxt'] = 'Connection failed: ' . $e->getMessage();
    }

    return $res;
/**/
}


function addTodo($json) {
    $text = $json['text'];

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'statusTxt'}='OK';
    try {
        $conn = new PDO(dburi, username, password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $result = $conn->prepare("INSERT INTO todos(text) VALUES(\"$text\");");
        $result->execute();
        $conn = null;
    } catch(PDOException $e) {
        $res['statusTxt'] = 'Connection failed: ' . $e->getMessage();
    }

    return $res;
}

function deleteTodo($json) { //validate_input($json['num']);

    $num = intval(validate_input($json['num']));

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'statusTxt'}='OK';
    try {
        $conn = new PDO(dburi, username, password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $result = $conn->prepare("SELECT done FROM todos WHERE id=$num;");
        $result->execute();
        $j=$result->fetchAll();
        if(!isset($j[0]{'done'})) {
            $res['statusTxt'] = "Error: no todo with id=$num";
        } else {
            $state = !($j[0]{'done'}) ? 'true' : 'false';

            $result = $conn->prepare("DELETE FROM todos WHERE id=$num;");
            $result->execute();
        }
        $conn = null;
    } catch(PDOException $e) {
        $res['statusTxt'] = 'Connection failed: ' . $e->getMessage();
    }
    return $res;
}

function toggleTodo($json) { //validate_input($json['num']);

    $num = validate_input($json['num']);

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'statusTxt'}='OK';
    try {
        $conn = new PDO(dburi, username, password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $result = $conn->prepare("SELECT done FROM todos WHERE id=$num;");
        $result->execute();
        $j=$result->fetchAll();
        if(!isset($j[0]{'done'})) {
            $res['statusTxt'] = "Error: no todo with id=$num";
        } else {
            $state = !($j[0]{'done'}) ? 'true' : 'false';

            $result = $conn->prepare("UPDATE todos SET done=$state WHERE id=$num;");
            $result->execute();
        }
        $conn = null;
    } catch(PDOException $e) {
        $res['statusTxt'] = 'Connection failed: ' . $e->getMessage();
    }

    return $res;
}

function logoff() {
    $_SERVER{'PHP_AUTH_USER'}='Not logged in.';
    session_unset();
    session_destroy();
    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    return $res;
}

?>

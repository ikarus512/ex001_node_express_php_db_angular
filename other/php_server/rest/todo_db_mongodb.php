<?php
// Uncomment these lines in php.ini file:
//      extension=php_mongo.dll
//      extension_dir="C:\1\to_del\_books\Programming\PHP\PHP5\ext"

define('dburi','mongodb://user1:password1@localhost:27017/dbtodo');

function listTodos($json)
{
    $a = array(
        'list all'   =>array(),
        'list done'  =>array('done'=>true),
        'list undone'=>array('done'=>false)
    );
    $filter = $a{$json['filter']};

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'statusTxt'}='OK';
    $res{'arr'}=[];

    try {
        $client = new MongoClient(dburi);
        $cursor = $client->{'dbtodo'}->{'todos'} -> find($filter);
        foreach($cursor as $_id=>$doc) {
            array_push($res{'arr'}, $doc);
        }
        $res['statusTxt'] = 'OK';
    } catch(PDOException $e) {
        $res['statusTxt'] = 'Connection failed: ' . $e->getMessage();
    } catch(Exception $e) {
        $res['statusTxt'] = 'Unkn exception: ' . $e->getMessage();
    }

    return $res;
}


function addTodo($json) {
    $text = $json['text'];

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'statusTxt'}='OK';
    try {
        $client = new MongoClient(dburi);
        // Get max id
        $cursor = $client->{'dbtodo'}->{'todos'} ->find(array('id' => array('$not' => array('$type' => 2))), array('id' => 1));
        $cursor->sort(array('id' => -1))->limit(1);
        $r=$cursor->next();
        $id=$r{'id'};
        // Insert at next id
        $client->{'dbtodo'}->{'todos'} -> insert(array(
            'id'=>$id+1,
            'todo'=>false,   //done, not todo???
            'text'=>$text
        ));
        $res['statusTxt'] = 'OK';
    } catch(PDOException $e) {
        $res['statusTxt'] = 'Connection failed: ' . $e->getMessage();
    } catch(Exception $e) {
        $res['statusTxt'] = 'Unkn exception: ' . $e->getMessage();
    }

    return $res;
}

function deleteTodo($json) { //validate_input($json['num']);

    $num = intval(validate_input($json['num']));

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'statusTxt'}='OK';
    try {
        $client = new MongoClient(dburi);
        $array=$client->{'dbtodo'}->{'todos'} -> findOne(array('id'=>$num));
        if(!$array) {
            $res['statusTxt'] = "Error: no todo with id=$num";
        } else {
            $array=$client->{'dbtodo'}->{'todos'} -> remove(array('id'=>$num));
            $res['statusTxt'] = 'OK';
        }
    } catch(PDOException $e) {
        $res['statusTxt'] = 'Connection failed: ' . $e->getMessage();
    } catch(Exception $e) {
        $res['statusTxt'] = 'Unkn exception: ' . $e->getMessage();
    }
    return $res;
}

function toggleTodo($json) { //validate_input($json['num']);

    $num = intval(validate_input($json['num']));

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'statusTxt'}='OK';
    try {
        $client = new MongoClient(dburi);
        $array=$client->{'dbtodo'}->{'todos'} -> findOne(array('id'=>$num));
        if(!$array) {
            $res['statusTxt'] = "Error: no todo with id=$num";
        } else {
            $done = !$array{'done'};
            $array = $client -> {'dbtodo'} -> {'todos'} ->
                update(
                    array('id'=>$num),
                    array('$set'=>array('done'=>$done))
                );
            if(!$array) {
                $res['statusTxt'] = "Error updating todo with id=$num";
            } else {
                $res['statusTxt'] = 'OK';
            }
        }
    } catch(PDOException $e) {
        $res['statusTxt'] = 'Connection failed: ' . $e->getMessage();
    } catch(Exception $e) {
        $res['statusTxt'] = 'Unkn exception: ' . $e->getMessage();
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

<?php
define('TXTDBFILENAME','db_file.txt');

function listTodos($json) {
    $filter = $json['filter'];

    //get content of textfile
    if(is_file(TXTDBFILENAME)) { $content = file(TXTDBFILENAME); } else { $content = "{\"todos\":[]}"; };
    //$content = ["{\"todos\":[{\"id\":10,\"done\":false,\"text\":\"wethw rth wrth\"}]}"];

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res['statusTxt'] = 'OK';
    $res{'arr'}=[];

    $j=json_decode(implode($content),true);
    $todos=$j{'todos'};
    for ($i = 0; $i < count($todos); $i++) {
        $todo=$todos[$i];
        if(    $filter == 'list all'
            || $filter == 'list done'   && $todo{'done'} == 1
            || $filter == 'list undone' && $todo{'done'} == 0 )
        {
            //$todo{id} = $i;
            array_push($res{'arr'}, $todo);
        }
    }

    return $res;
}

function addTodo($json) {
    $text = $json['text'];

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'resultTxt'}='';
    $res{'statusTxt'}='OK';

    //get content of textfile
    if(is_file(TXTDBFILENAME)) { $content = file(TXTDBFILENAME); } else { $content = ''; };
    $j=json_decode(implode($content),true); //echo $j->{'todos'}[0]->{'done'};

    // find max id
    $id = 0;
    foreach($j{'todos'} as $item) {
        if(is_integer($item{'id'}))
            if($id<$item{'id'}) $id = $item{'id'};
    }
    $id=$id+1;
    //error_log($id);

    array_push($j{'todos'},array('id'=>$id, 'done'=>false, 'text'=>$text));

    //var_dump($j); echo '<br>';
    //echo json_encode($j).'<br>';

    rewrite_file($j);

    return $res;
}

function deleteTodo($json) { //validate_input($json['num']);

    $num = intval(validate_input($json['num']));

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'resultTxt'}='';
    $res{'statusTxt'}='OK';

    //get content of textfile
    if(is_file(TXTDBFILENAME)) { $content = file(TXTDBFILENAME); } else { $content = ''; };
    $j=json_decode(implode($content),true);

    if (!preg_match('/^[+-]?\\d+$/',$num) ) {
        $res{'statusTxt'} = "Error: num=$num is not an integer<br>";
    } else {
        $found=false;
        $j{'todos'} = array_filter($j{'todos'}, function($item) use($num,&$found,&$d,&$t){
            $r = ($item{'id'} == $num); //error_log(intval($item{'id'}).', '. $num.', '.$r);
            if($r) {
                $found=true;
                $d=$item{'done'}; $t=$item{'text'};
            }
            return !$r;
        }); // it converts array to hash
        $j{'todos'} = array_values($j{'todos'}); // convert hash to array

        if($found) {
            $res{'statusTxt'} = "Success: todo $num {done:$d,text:\"$t\") deleted <br>";
            rewrite_file($j);
        } else {
            $res{'statusTxt'} = "Error: no todo with id=$num <br>";
        }

    }
    return $res;
}

function toggleTodo($json) { //validate_input($json['num']);

    $num = validate_input($json['num']);

    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'resultTxt'}='';
    $res{'statusTxt'}='OK';

    //get content of textfile
    if(is_file(TXTDBFILENAME)) { $content = file(TXTDBFILENAME); } else { $content = ''; };
    $j=json_decode(implode($content),true);

    if (!preg_match('/^[+-]?\\d+$/',$num) ) {
        $res{'statusTxt'} = "Error: num=$num is not an integer<br>";
    } else {
        $found=false;
        foreach($j{'todos'} as &$item) {
            if( $item{'id'} == $num ) {
                $item{'done'} = !$item{'done'};
                $found=true; $d=$item{'done'}; $t=$item{'text'};
            }
        } // it converts array to hash
        $j{'todos'} = array_values($j{'todos'}); // convert hash to array

        if($found) {
            $res{'statusTxt'} = "Success: todo $num {done:$d,text:\"$t\") toggled <br>";
            rewrite_file($j);
        } else {
            $res{'statusTxt'} = "Error: no todo with id=$num <br>";
        }

    }
    return $res;
}

function rewrite_file($j) {
  $s=json_encode($j);
  $s=str_replace("},","},\n",$s); $s=str_replace(":[",":[\n",$s);
  $f=fopen(TXTDBFILENAME,'w'); fputs($f,$s); fclose($f);
}

function logoff() {
    $_SERVER{'PHP_AUTH_USER'}='Not logged in.';
    session_unset();
    session_destroy();
    $res{'USER'}=$_SERVER{'PHP_AUTH_USER'};
    $res{'resultTxt'}='';
    $res{'statusTxt'}='OK';
    return $res;
}

?>

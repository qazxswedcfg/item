<?php
    include 'conn.php';

    $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
    $password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';

    $sql = "SELECT * FROM userinf WHERE username='$name' AND psw='$password'";

    $res = $conn->query($sql);

    if($res->num_rows){
        echo 'yes';
    }else{
        echo 'no';
    }
?>
<?php
    include 'conn.php';

    $name = isset($_REQUEST['name']) ? ($_REQUEST['name']) : '';
    $password = isset($_REQUEST['password']) ? ($_REQUEST['password']) : '';

    $sql = "INSERT INTO userinf(username,psw) VALUES('$name','$password');";

    $res = $conn->query($sql);

    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }
?>
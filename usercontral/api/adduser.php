<?php
    include 'conn.php';

    $username = isset($_REQUEST['username']) ? ($_REQUEST['username']) : '';
    $psw = isset($_REQUEST['psw']) ? ($_REQUEST['psw']) : '';

    $sql = "INSERT INTO userinf (username,psw) VALUES('$username','$psw');";
    $res = $conn->query($sql);

    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }


?>
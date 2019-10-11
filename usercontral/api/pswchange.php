<?php
    include 'conn.php';

    $uid = isset($_REQUEST['uid']) ? ($_REQUEST['uid']) : '';
    $psw = isset($_REQUEST['psw']) ? ($_REQUEST['psw']) : '';

    $sql = "UPDATE userinf SET psw='$psw' WHERE uid=$uid;";
    $res = $conn->query($sql);

    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }



?>
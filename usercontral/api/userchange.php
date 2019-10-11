<?php
    include 'conn.php';

    $uid = isset($_REQUEST['uid1']) ? ($_REQUEST['uid1']) : '';
    $username = isset($_REQUEST['username1']) ? ($_REQUEST['username1']) : '';

    $sql = "UPDATE userinf SET username='$username' WHERE uid=$uid;";
    $res = $conn->query($sql);

    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }
?>
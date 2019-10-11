<?php
    include 'conn.php';

    $uid = isset($_REQUEST['uid1']) ? ($_REQUEST['uid1']) : '';

    $sql = "DELETE FROM userinf WHERE uid IN('$uid');";
    $res = $conn->query($sql);

    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }
?>
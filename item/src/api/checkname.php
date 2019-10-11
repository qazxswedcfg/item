<?php
    include 'conn.php';

    $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';

    $sql = "SELECT * FROM userinf WHERE username='$name'";

    $res = $conn->query($sql);

    if($res->num_rows){
        echo 'no';
    }else{
        echo 'yes';
    }
?>
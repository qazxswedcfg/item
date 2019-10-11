<?php
    include 'conn.php';

    $title = isset($_REQUEST['title']) ? $_REQUEST['title'] : '';

    $sql = "SELECT * FROM indexnav WHERE goodstype = '$title'";
    $res = $conn->query($sql);
    $arr = $res->fetch_all(MYSQLI_ASSOC);
    if($arr){
        echo json_encode($arr);
    }else{
        echo 'no';
    }
    
?>
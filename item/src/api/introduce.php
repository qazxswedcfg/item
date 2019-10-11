<?php
    include 'conn.php';

    $sql = "SELECT * FROM goodslist2";
    $res = $conn->query($sql);
    $arr = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($arr);

?>
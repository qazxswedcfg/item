<?php
    include 'conn.php';

    $sql = "SELECT * FROM shopcar";
    $res = $conn->query($sql);
    $arr = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($arr);

?>
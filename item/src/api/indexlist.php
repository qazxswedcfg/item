<?php
    include 'conn.php';

    $sql = "SELECT * FROM indexlist";
    $res = $conn->query($sql);
    $arr = $res->fetch_all(MYSQLI_ASSOC);

    // echo json_encode($arr);
    // $data = array(
    //     'list' => $arr
    // );
    echo json_encode($arr);
?>
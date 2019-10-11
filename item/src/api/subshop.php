<?php
    include 'conn.php';

    $gid = isset($_REQUEST['gid']) ? ($_REQUEST['gid']) : '';

    $sql = "DELETE FROM shopcar WHERE gid IN('$gid');";
    $res = $conn->query($sql);


?>
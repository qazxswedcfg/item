<?php
    $servername = 'localhost';
    $username = 'root';
    $password = 'root';
    $dbname = 'item';

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("连接失败：". $conn->connect_error);
    }

?>
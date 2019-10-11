<?php
    include 'conn.php';

    $gid = isset($_REQUEST['gid']) ? ($_REQUEST['gid']) : '';
    $url = isset($_REQUEST['url']) ? ($_REQUEST['url']) : '';
    $title = isset($_REQUEST['title']) ? ($_REQUEST['title']) : '';
    $diqu1 = isset($_REQUEST['diqu1']) ? ($_REQUEST['diqu1']) : '';
    $price1 = isset($_REQUEST['price1']) ? ($_REQUEST['price1']) : '';
    $kucun = isset($_REQUEST['kucun']) ? ($_REQUEST['kucun']) : '';
    $num = isset($_REQUEST['num']) ? ($_REQUEST['num']) : '';
    $xiaoji = isset($_REQUEST['xiaoji']) ? ($_REQUEST['xiaoji']) : '';

    $sql = "INSERT INTO shopcar(gid,url,title,diqu1,price1,kucun,num,xiaoji) VALUES('$gid','$url','$title','$diqu1','$price1','$kucun','$num','$xiaoji');";
    $res = $conn->query($sql);

    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }
?>
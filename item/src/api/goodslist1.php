<?php
    include 'conn.php';

    $page = isset($_REQUEST['ipage']) ? $_REQUEST['ipage'] : '';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '';
    $paixu = isset($_REQUEST['paixu']) ? $_REQUEST['paixu'] : ''; //排序
    $min = isset($_REQUEST['min']) ? $_REQUEST['min'] : ''; //区间最小值
    $max = isset($_REQUEST['max']) ? $_REQUEST['max'] : ''; //区间最大值
    $neirong = isset($_REQUEST['neirong']) ? $_REQUEST['neirong'] : ''; //模糊查询
    // echo $paixu;
    $index = ($page - 1) * $num;

    if($paixu){
        if($max){
            $sql = "SELECT * FROM goodslist2 WHERE price1 BETWEEN $min AND $max ORDER BY $paixu DESC LIMIT $index,$num";
            $res = $conn->query($sql);
            $arr = $res->fetch_all(MYSQLI_ASSOC);
    
            $sql2 = "SELECT * FROM goodslist2 WHERE price1 BETWEEN $min AND $max ORDER BY $paixu";
            $res2 = $conn->query($sql2);
        }else{
            $sql = "SELECT * FROM goodslist2 ORDER BY $paixu DESC LIMIT $index,$num";
            $res = $conn->query($sql);
            $arr = $res->fetch_all(MYSQLI_ASSOC);

            $sql2 = "SELECT * FROM goodslist2";
            $res2 = $conn->query($sql2);
        }
        
    }else if($max){
        $sql = "SELECT * FROM goodslist2 WHERE price1 BETWEEN $min AND $max ORDER BY price1 LIMIT $index,$num";
        $res = $conn->query($sql);
        $arr = $res->fetch_all(MYSQLI_ASSOC);

        $sql2 = "SELECT * FROM goodslist2 WHERE price1 BETWEEN $min AND $max ORDER BY price1";
        $res2 = $conn->query($sql2);
    }else if($neirong){
        if($paixu){
            $sql = "SELECT * FROM goodslist2 WHERE CONCAT(title,diqu) LIKE '%$neirong%' ORDER BY $paixu DESC LIMIT $index,$num";
            $res = $conn->query($sql);
            $arr = $res->fetch_all(MYSQLI_ASSOC);

            $sql2 = "SELECT * FROM goodslist2 WHERE CONCAT(title,diqu) LIKE '%$neirong%'";
            $res2 = $conn->query($sql2);
        }else{
            $sql = "SELECT * FROM goodslist2 WHERE CONCAT(title,diqu) LIKE '%$neirong%' LIMIT $index,$num";
            $res = $conn->query($sql);
            $arr = $res->fetch_all(MYSQLI_ASSOC);

            $sql2 = "SELECT * FROM goodslist2 WHERE CONCAT(title,diqu) LIKE '%$neirong%'";
            $res2 = $conn->query($sql2);
        }
        
    }
    else{
        $sql = "SELECT * FROM goodslist2 LIMIT $index,$num";
        $res = $conn->query($sql);
        $arr = $res->fetch_all(MYSQLI_ASSOC);

        $sql2 = "SELECT * FROM goodslist2";
        $res2 = $conn->query($sql2);
    
    }

    // $sql = "SELECT * FROM goodslist2 LIMIT $index,$num";
    // $res = $conn->query($sql);
    // $arr = $res->fetch_all(MYSQLI_ASSOC);

    // $sql2 = "SELECT * FROM goodslist2";
    // $res2 = $conn->query($sql2);


    $data = array(
        'total' => $res2->num_rows,
        'list' => $arr,
        'page' => $page,
        'num' => $num
    );
    echo json_encode($data);
?>
<?php
include "conn.php";//引入数据库连接代码。
$result = $conn->query("select * from taobao"); 

$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);




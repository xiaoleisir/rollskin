<?php
include "conn.php";
$result = $conn->query("select * from taobao"); 
$num = $result->num_rows; 
$pagesize = 10; 
$pagenum = ceil($num / $pagesize); 

if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}


$page = ($pagevalue - 1) * $pagesize;

$res = $conn->query("select * from taobao limit $page,$pagesize");



$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}


class listdata{

}

$list = new listdata();

$list->pagedata = $arr;
$list->pageno = $pagenum;

echo json_encode($list);




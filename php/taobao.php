
<?php
header("content-type:text/html;charset=utf-8");
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','');
define('DBNAME','render');
$mysql = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);

if($mysql->connect_error){
    die("连接数据库错误,".$conn->connect_error);
}


$result=$mysql->query("select * from hometaobao ");

$arr=array();

for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}

echo json_encode($arr);
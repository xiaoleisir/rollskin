
<?php
header("content-type:text/html;charset=utf-8");
define('HOST','localhost');//主机名
define('USERNAME','root');//用户名
define('PASSWORD','');//密码
define('DBNAME','render');//数据库名
$mysql = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);

if($mysql->connect_error){
    die("连接数据库错误,".$conn->connect_error);//自定义错误
}


$result=$mysql->query("select * from taobao");

$arr=array();

for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}

echo json_encode($arr);
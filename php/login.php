<?php
include "conn.php";

if(isset($_POST['tel']) && isset($_POST['pass'])){
    $tel = $_POST['tel'];
    $pass = sha1($_POST['pass']);
    $result=$conn->query("select * from registry where tel='$tel' and password='$pass'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
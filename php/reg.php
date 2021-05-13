<?php

include "conn.php";

if(isset($_POST['tel'])){
    $name = $_POST['tel'];
    $result=$conn->query("select * from registry where tel='$name'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}

if(isset($_POST['submit'])){
    $tel = $_POST['tel'];
    $pass = sha1($_POST['password']);
    $conn->query("insert registry values(null,'$tel','$pass',NOW())");
    header('location:http://10.31.161.106/dashboard/rollskin/src/login.html');
}



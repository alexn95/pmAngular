<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'MSSConnect.php';
include 'JWT.php';

$conn = MSSConnect();
$query = "SELECT * FROM tasks where id = ?";
$params = array(1, "1");
$stmt = sqlsrv_query( $conn, $query, $params);
if( $stmt === false ) {
    die( print_r( sqlsrv_errors(), true));
}
$result = sqlsrv_fetch_object($stmt);
$jsonData = json_encode($result);


if( $conn ) {
    echo($jsonData);
    sqlsrv_close($conn);
}else{
    var_dump( "Connection could not be established");
     die( print_r( sqlsrv_errors(), true));
}

   
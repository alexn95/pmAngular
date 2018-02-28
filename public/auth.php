<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'MSSConnect.php';
include 'JWT.php';
use \Firebase\JWT\JWT;

$conn = MSSConnect();
$login = $_POST['login'];
$pass = $_POST['pass'];

$query = "DECLARE @id INT;
        EXECUTE auth ?, ?,
        @id = @id OUTPUT;
        SELECT @id id;";
$params = array($login, $pass);
$stmt = sqlsrv_query( $conn, $query, $params);
if( $stmt === false ) {
    die( print_r( sqlsrv_errors(), true));
}

$data = sqlsrv_fetch_array($stmt);
$result = array();
$result["id"] = $data[0];
if ($data[0] != null){
    $key = "pm_JWT_secret_key";
    $token = array(
        "id" => $data[0]
    );
    $encodeToken = JWT::encode($token, $key);
    $result["token"] = $encodeToken;
    // $decodeToken = JWT::decode($encodeToken, $key, array('HS256'));
    // $result["token1"] = $decodeToken;
}  
$jsonData = json_encode($result);
echo($jsonData);

sqlsrv_close($conn);

   
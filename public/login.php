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

$query = "DECLARE @id INT, @status BIT;
        EXECUTE auth ?, ?,
        @id = @id OUTPUT,
        @status = @status OUTPUT;;
        SELECT @id id, @status status;";
$params = array($login, $pass);
$stmt = sqlsrv_query( $conn, $query, $params);
if( $stmt === false ) {
    die( print_r( sqlsrv_errors(), true));
}

$data = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
$result["status"] = $data["status"]; 

if ($result["status"]){
    $result['id'] = $data["id"];
    $result['login'] = $login;
    $key = "pm_JWT_secret_key";
    $token = array(
        "id" => $data['id'],
        "login" => $login
    );
    $encodeToken = JWT::encode($token, $key);
    $result["token"] = $encodeToken;
}  
$jsonData = json_encode($result);
echo($jsonData);

sqlsrv_close($conn);

   
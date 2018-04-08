<?php
include 'JWT.php';
use \Firebase\JWT\JWT;


function signup($conn){
    $login = $_POST['login'];
    $pass = $_POST['pass'];

    $query = "DECLARE @status bit;
        EXECUTE @status = signup ?, ?;
        SELECT @status status;";
    $params = array($login, $pass);
    $stmt = sqlsrv_query( $conn, $query, $params);
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    }

    while (!$result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
        sqlsrv_next_result($stmt); 
    }
    return $result;

}


function login($conn){
    $login = $_POST['login'];
    $pass = $_POST['pass'];

    $query = "DECLARE @id INT, @status BIT;
            EXECUTE login ?, ?,
            @id = @id OUTPUT,
            @status = @status OUTPUT;
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
    return $result;
}
<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'services/authQueries.php';
include 'services/MSSConnect.php';

$conn = MSSConnect();
$result = signup($conn);
$jsonData = json_encode($result);
echo($jsonData);

sqlsrv_close($conn);

   
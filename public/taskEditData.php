<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'isValidToken.php';
include 'tasksQueries.php';

if (!isValidToken($_POST)){
    echo(json_encode(false));
    return;
} 

$conn = MSSConnect();
$result[] = getTaskStates($conn);
$result[] = getProjectUsers($conn, $_POST['projId']);

$jsonData = json_encode($result);
echo($jsonData);
sqlsrv_close($conn);



   
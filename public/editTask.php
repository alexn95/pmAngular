<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'isValidToken.php';
include 'tasksQueries.php';

if (!isValidToken($_POST)){
    echo(json_encode(false));
    return false;
} 

// $post = array(
//     "taskId" => 1,
//     "title" => "task1",
//     "type" => "bug",
//     "description" => "desc",
//     "userId" => null,
//     "stateId" => 3, 
//     "projId" => 3
// );

$conn = MSSConnect();
$result = saveEditTask($conn, $_POST);

$jsonData = json_encode($result);
echo($jsonData);
sqlsrv_close($conn);


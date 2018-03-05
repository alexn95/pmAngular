<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'MSSConnect.php';
include 'isValidToken.php';

if (!isValidToken($_POST)){
    echo(json_encode(false));
    return;
} 

$conn = MSSConnect();
$query = "SELECT tasks.id, tasks.title, tasks.description, task_state.title as task_state, tasks.state_id,
        tasks.type, projects.title as project_title, tasks.project_id, users.login, tasks.user_id FROM tasks
        LEFT JOIN projects  ON tasks.project_id = projects.id
        LEFT JOIN users  ON tasks.user_id = users.id
        LEFT JOIN task_state ON task_state.id = tasks.state_id;";
$stmt = sqlsrv_query( $conn, $query);
if( $stmt === false ) {
    die( print_r( sqlsrv_errors(), true));
} 

$result = array(); 
while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
    $result[] = $row;
}

$jsonData = json_encode($result);
echo($jsonData);
sqlsrv_close($conn);



   
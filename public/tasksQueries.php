<?php
include 'MSSConnect.php';

function getTaskStates($conn){

    $query = "SELECT id, title FROM task_state";
    $stmt = sqlsrv_query( $conn, $query);
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    } 

    $states = array(); 
    while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
        $states[] = $row;
    }
    return $states;
}

function getProjectUsers($conn, $projId){
    $query = "SELECT [users].id, [login] FROM [users]
            LEFT JOIN users_projects  ON users.id = users_projects.user_id
            WHERE users_projects.project_id = ?";
    $params = array($projId);
    $stmt = sqlsrv_query( $conn, $query, $params);
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    } 

    $users = array(); 
    while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
        $users[] = $row;
    }
    return $users;
}

function saveEditTask($conn, $data){
    if ($data['userId'] == 'null'){
        $data['userId'] = null;
    }
    $query = "DECLARE @status BIT;
    EXECUTE @status = editTask
        @taskId = ?,
        @title = ?,
        @type = ?,
        @description = ?,
        @userId = ?,
        @stateId = ?,
        @projectId = ?;
    SELECT @status as status;";
    $params = array($data['taskId'], $data['title'], $data['type'], $data['description'],
                $data['userId'], $data['stateId'], $data['projId']);
    // $query = "{call editTask( ?, ?, ?, ?, ?, ?, ?)}";
	// $params = [
	// 	[$data['taskId'], SQLSRV_PARAM_IN, null, SQLSRV_SQLTYPE_INT],
	// 	[$data['title'], SQLSRV_PARAM_IN, null, SQLSRV_SQLTYPE_VARCHAR],
    //     [$data['type'], SQLSRV_PARAM_IN, null, SQLSRV_SQLTYPE_VARCHAR],
    //     [$data['description'], SQLSRV_PARAM_IN, null, SQLSRV_SQLTYPE_VARCHAR],
    //     [$data['userId'], SQLSRV_PARAM_IN, null, SQLSRV_SQLTYPE_INT],
    //     [$data['stateId'], SQLSRV_PARAM_IN, null, SQLSRV_SQLTYPE_INT],
    //     [$data['projId'], SQLSRV_PARAM_IN, null, SQLSRV_SQLTYPE_INT]
	// ];
    $stmt = sqlsrv_query( $conn, $query, $params );
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    }
    while (!$row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
        sqlsrv_next_result($stmt); 
    }
    $result = $row;
    return $result;
}
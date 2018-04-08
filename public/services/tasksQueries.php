<?php
 

function getProjectUsers($conn, $projId){
    $query = "SELECT * FROM getProjectUsers (?)";
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
        @state = ?,
        @projectId = ?;
    SELECT @status as status;";
    $params = array($data['taskId'], $data['title'], $data['type'], $data['description'],
                $data['userId'], $data['state'], $data['projId']);
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
    while (!$result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
        sqlsrv_next_result($stmt); 
    }
    return $result;
}

function saveNewTask($conn, $data){
    if ($data['userId'] == 'null'){
        $data['userId'] = null;
    }
    $query = "DECLARE @status BIT;
    EXECUTE @status = createTask
        @title = ?,
        @type = ?,
        @description = ?,
        @userId = ?,
        @state = ?,
        @projectId = ?;
    SELECT @status as status;";
    $params = array($data['title'], $data['type'], $data['description'],
                $data['userId'], $data['state'], $data['projId']);
    $stmt = sqlsrv_query( $conn, $query, $params );
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    }
    while (!$result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
        sqlsrv_next_result($stmt); 
    }
    return $result;
}

function searchTasks($conn, $projId, $title, $state, $userId, $onlyYourTask, $ofset, $count){
    $query = "EXEC searchTasks  @projectId = ?, @title = ?, @state = ?,  @userId = ?, 
                                @onlyYourTask = ?, @ofset = ?, @count = ?";
    $params = array($projId, $title, $state, $userId, $onlyYourTask, $ofset, $count);
    $stmt = sqlsrv_query( $conn, $query, $params);
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    } 

    $result = array(); 
    while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
        $result[] = $row;
    }
    return $result;
}

function deleteTask($conn, $taskId){
    $query = "EXEC deleteTask @taskId = ?";
    $stmt = sqlsrv_query( $conn, $query, [$taskId]);
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    } 
}

function takeTask($conn, $taskId, $userId){
    $query = "EXEC takeTask @userId = ?, @taskId = ?";
    $params = array($userId, $taskId);
    $stmt = sqlsrv_query( $conn, $query, $params);
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    } 
}

function leaveTask($conn, $taskId){
    $query = "EXEC leaveTask @taskId = ?";
    $params = array($taskId);
    $stmt = sqlsrv_query( $conn, $query, $params);
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    } 
}
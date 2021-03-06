<?php

function leaveProject($conn, $projectId, $userId){
    $query = "EXEC leaveProject @userId = ?, @projectId = ?";
    $params = array($userId, $projectId);
    $stmt = sqlsrv_query( $conn, $query, $params);
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    } 
}

function joinProject($conn, $projectId, $userId){
    $query = "EXEC joinProject @userId = ?, @projectId = ?";
    $params = array($userId, $projectId);
    $stmt = sqlsrv_query( $conn, $query, $params);
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    } 
}

function searchProjects($conn, $onlyUserProjects, $title, $userId, $ofset, $count){
    $query = "EXEC searchProjects @onlyUserProjects = ?, @title = ?, @userId = ?, @ofset = ?, @count = ?";
    $params = array($onlyUserProjects, $title, $userId, intval($ofset), intval($count));
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

function getProjectById($conn, $id){
    $query = "SELECT * FROM getProjectById (?)";
    $params = array($id);
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

function saveEditProject($conn, $data){
    if ($data['userId'] == 'null'){
        $data['userId'] = null;
    }
    $query = "DECLARE @status BIT;
    EXECUTE @status = editProject
        @projectId = ?,
        @title = ?,
        @description = ?,
        @state = ?
    SELECT @status as status;";
    $params = array($data['projectId'], $data['title'], $data['description'], $data['state']);
    $stmt = sqlsrv_query( $conn, $query, $params );
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    }
    while (!$result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
        sqlsrv_next_result($stmt); 
    }
    return $result;
}

function saveNewProject($conn, $data){
    if ($data['id'] == 'null'){
        $data['id'] = null;
    }
    $query = "DECLARE @status BIT;
    EXECUTE @status = createProject
        @title = ?,
        @description = ?,
        @userId = ?
    SELECT @status as status;";
    $params = array($data['title'], $data['description'], $data['id']);
    $stmt = sqlsrv_query( $conn, $query, $params );
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    }
    while (!$result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
        sqlsrv_next_result($stmt); 
    }
    return $result;
}

function deleteProject($conn, $projectId){
    $query = "EXEC deleteProject @projectId = ?";
    $stmt = sqlsrv_query( $conn, $query, [$projectId]);
    if( $stmt === false ) {
        die( print_r( sqlsrv_errors(), true));
    } 
}
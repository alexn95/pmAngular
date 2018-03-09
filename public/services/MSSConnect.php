<?php
function MSSConnect(){
    $serverName = 'DESKTOP-8OK7H9N\SQLEXPRESS';
    $connectionInfo = array( "Database"=>"pm");
    $conn = sqlsrv_connect( $serverName, $connectionInfo);
    if(! $conn ) {
        var_dump( "Connection could not be established");
        die( print_r( sqlsrv_errors(), true));
    }
    return $conn;
}
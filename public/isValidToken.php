<?php
include 'JWT.php';
use \Firebase\JWT\JWT;

function isValidToken($post){
    // $post['token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibG9naW4iOiJ1c2VyMSJ9.GIvsDbJyBYZBEmNt_dQnhdovb1756qAnyPb176Ud1bs';
    // $post['id'] = '3';
    // $post['login'] = 'user1';
    
    if (!array_key_exists('id',$post) ||
        !array_key_exists('login',$post) ||
        !array_key_exists('token',$post)){
        return false;
    }
    
    $key = "pm_JWT_secret_key";
    $decodeToken = JWT::decode($post['token'], $key, array('HS256'));
    if ($decodeToken->id != $post['id'] || $decodeToken->login != $post['login']){
        return false;
    }
    
    return true; 
}
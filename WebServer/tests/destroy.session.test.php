<?php

$sessionId = $_GET['sessionId'];
ini_set('session.use_strict_mode', 0);
session_id($sessionId);
session_start();

var_dump($_SESSION);
echo '<br>';
echo '<br>';

if( session_status() === PHP_SESSION_ACTIVE ) {
	echo 'Session is active -> killing it... <br>';
	session_destroy();
}

echo '<br>';
echo '<br>';
var_dump($_SESSION);
?>
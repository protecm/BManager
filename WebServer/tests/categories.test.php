<?php

require_once __DIR__ . '/../services/data.service.php';

echo '<br>TEST - 1<br>';
$result = DataService::SelectData("SELECT * FROM `categories`");

$data = array();
while($row = $result->fetch_assoc()) {
	$data[] = $row;
}

var_dump($data);

echo '<br>TEST - 2<br>';
$result = DataService::InsertData( "INSERT INTO `categories` (`id`,`name`)
		VALUES( '100','milk')" );

var_dump($result);
?>
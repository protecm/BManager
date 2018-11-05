<?php

require_once __DIR__ . '/../services/data.service.php';

$username = 'admin';
$password = md5('admin');

$result = DataService::SelectData("SELECT `id` FROM `users` WHERE `name`='$username' AND `password`='$password'");

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		echo "ID = {$row['id']}";
	}
} else {
	echo "0 results";
}

?>
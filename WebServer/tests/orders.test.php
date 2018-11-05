<?php

require_once __DIR__ . '/../objects/order.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/data.service.php';

echo '<br>TEST - 1<br>';
$dbMessage = DataService::SelectData("SELECT `orders`.*, `order_rows`.`product_id`, `order_rows`.`amount`, 
		`order_rows`.`notes` AS `row_notes`, `order_rows`.`status` AS `row_status` 
		FROM `orders` 
		LEFT JOIN `order_rows`
		ON `orders`.`id`=`order_rows`.`order_id`
		ORDER BY `orders`.`id` ASC");

$queryData = $dbMessage->data;
$data = array();
while( $row = $queryData->fetch_assoc() ) {
	$data[] = $row;
}
$dbMessage->data = $data;

var_dump($data);

?>
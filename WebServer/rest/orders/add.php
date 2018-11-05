<?php

require_once __DIR__ . '/../../services/orders.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$order = OrdersService::Deserialize($wrapper->postData['reqData']);
	return OrdersService::AddOrder($order);
};

$wrapper->execute($callback);

?>
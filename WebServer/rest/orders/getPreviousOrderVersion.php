<?php

require_once __DIR__ . '/../../services/orders.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';
require_once __DIR__ . '/../../objects/order.filter.object.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$order = OrdersService::Deserialize($wrapper->postData['reqData']);
	return OrdersService::GetPreviousOrderVersion($order);
};

$wrapper->execute($callback);

?>
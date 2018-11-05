<?php

require_once __DIR__ . '/../../services/orders.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	//TODO - Code Review + use filter object in this request
	$reqStr = base64_decode($wrapper->postData['reqData']);
	$reqObj = json_decode($reqStr);
	return OrdersService::GetCommonProducts($reqObj->data);
};

$wrapper->execute($callback);

?>
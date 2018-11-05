<?php

require_once __DIR__ . '/../../services/products.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$product = ProductsService::Deserialize($wrapper->postData['reqData']);
	return ProductsService::AddProduct($product);
};

$wrapper->execute($callback);

?>
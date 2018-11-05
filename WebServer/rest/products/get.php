<?php

require_once __DIR__ . '/../../services/products.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';
require_once __DIR__ . '/../../objects/product.filter.object.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$filter = ProductFilterObject::FromBase($wrapper->postData['reqData'], TypesConstants::PRODUCT_FILTER);
	return ProductsService::GetProducts($filter);
};

$wrapper->execute($callback);

?>
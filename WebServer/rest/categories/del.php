<?php

require_once __DIR__ . '/../../services/categories.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$category = CategoriesService::Deserialize($wrapper->postData['reqData']);
	return CategoriesService::DeleteCategory($category);
};

$wrapper->execute($callback);

?>
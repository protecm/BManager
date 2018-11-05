<?php

require_once __DIR__ . '/../../constants/types.constants.php';
require_once __DIR__ . '/../../objects/edit.ticket.object.php';
require_once __DIR__ . '/../../services/products.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$ticket = EditTicketObject::FromBase($wrapper->postData['reqData'], TypesConstants::PRODUCT);
	return ProductsService::EditProduct($ticket);
};

$wrapper->execute($callback);

?>
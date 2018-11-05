<?php

require_once __DIR__ . '/../../constants/types.constants.php';
require_once __DIR__ . '/../../objects/edit.ticket.object.php';
require_once __DIR__ . '/../../services/categories.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$ticket = EditTicketObject::FromBase($wrapper->postData['reqData'], TypesConstants::CATEGORY);
	return CategoriesService::EditCategory($ticket);
};

$wrapper->execute($callback);

?>
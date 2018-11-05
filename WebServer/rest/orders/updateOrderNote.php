<?php

require_once __DIR__ . '/../../constants/types.constants.php';
require_once __DIR__ . '/../../objects/update.ticket.object.php';
require_once __DIR__ . '/../../services/orders.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$ticket = UpdateTicketObject::FromBase($wrapper->postData['reqData'], TypesConstants::ORDER);
	return OrdersService::UpdateOrderNote($ticket);
};

$wrapper->execute($callback);

?>
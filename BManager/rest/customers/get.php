<?php

require_once __DIR__ . '/../../services/customers.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';
require_once __DIR__ . '/../../objects/customer.filter.object.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$filter = CustomerFilterObject::FromBase($wrapper->postData['reqData'], TypesConstants::CUSTOMER_FILTER);
	return CustomersService::GetCustomers($filter);
};

$wrapper->execute($callback);

?>
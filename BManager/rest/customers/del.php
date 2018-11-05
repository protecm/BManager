<?php

require_once __DIR__ . '/../../services/customers.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
    global $wrapper;
    $customer = CustomersService::Deserialize($wrapper->postData['reqData']);
    return CustomersService::DeleteCustomer($customer);
};

$wrapper->execute($callback);

?>
<?php

require_once __DIR__ . '/../../services/users.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';
require_once __DIR__ . '/../../objects/user.filter.object.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$filter = UserFilterObject::FromBase($wrapper->postData['reqData'], TypesConstants::USER_FILTER);
	return UsersService::GetUsers($filter);
};

$wrapper->execute($callback);

?>
<?php

require_once __DIR__ . '/../../constants/types.constants.php';
require_once __DIR__ . '/../../services/statistics.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';
require_once __DIR__ . '/../../objects/order.filter.object.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
	global $wrapper;
	$filter = OrderFilterObject::FromBase($wrapper->postData['reqData'], TypesConstants::ORDER_FILTER);
	return StatisticsService::GetStatistics($filter);
};

$wrapper->execute($callback);

?>
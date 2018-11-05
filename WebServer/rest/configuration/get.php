<?php

require_once __DIR__ . '/../../services/configuration.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
    global $wrapper;
	return ConfigurationService::GetConfigurations();
};

$wrapper->execute($callback);

?>
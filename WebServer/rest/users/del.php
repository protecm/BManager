<?php

require_once __DIR__ . '/../../services/users.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
    global $wrapper;
    $user = UsersService::Deserialize($wrapper->postData['reqData']);
    return UsersService::DeleteUser($user);
};

$wrapper->execute($callback);

?>
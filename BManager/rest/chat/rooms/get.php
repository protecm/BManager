<?php

require_once __DIR__ . '/../../../services/chat.service.php';
require_once __DIR__ . '/../../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
    global $wrapper;
    //TODO - Get chat rooms according to user permissions
    return ChatService::GetChatRooms();
};

$wrapper->execute($callback);

?>
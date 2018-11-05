<?php

require_once __DIR__ . '/../../services/chat.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
    global $wrapper;
    $chatMsg = ChatService::Deserialize($wrapper->postData['reqData']);
    return ChatService::SendMessage($wrapper->credentials->sessionId, $chatMsg);
};

$wrapper->execute($callback);

?>
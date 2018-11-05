<?php

require_once __DIR__ . '/../../constants/types.constants.php';
require_once __DIR__ . '/../../objects/chat.msg.object.php';
require_once __DIR__ . '/../../services/chat.service.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

$callback = function():DbMessageObject {
    global $wrapper;
    $chatDep = ChatDepartmentObject::FromBase($wrapper->postData['reqData'], TypesConstants::CHAT_DEPARTMENT);
    return ChatService::GetConversation($chatDep);
};

$wrapper->execute($callback);

?>
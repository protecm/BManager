<?php

require_once __DIR__ . '/../../constants/messages.constants.php';
require_once __DIR__ . '/../../constants/types.constants.php';
require_once __DIR__ . '/../../objects/chat.poll.request.object.php';
require_once __DIR__ . '/../../objects/chat.poll.response.object.php';
require_once __DIR__ . '/../../services/chat.service.php';
require_once __DIR__ . '/../../objects/db.message.object.php';
require_once __DIR__ . '/../../wrappers/request.wrapper.php';

$wrapper = new RequestWrapper();

error_reporting(0); //Using custom error handler
register_shutdown_function(
    function () {
        global $wrapper;
        $wrapper->errorHandler();
        return true;
    }
);

$callback = function():DbMessageObject {
    global $wrapper;
    $chatPollReqGroup = ChatPollRequestGroupObject::FromBase($wrapper->postData['reqData'], TypesConstants::CHAT_POLL_REQUEST);
    
    set_time_limit(60);    //1 minute
    while(true) {
        /** @var $data DbMessageObject[] */
        $data = array();
        
        /** @var $chatPollReq ChatPollRequestObject */
        foreach ($chatPollReqGroup->data as $chatPollReq) {
            $dbMessage = ChatService::GetConversation($chatPollReq->department, $chatPollReq->clientLastMsgID, $wrapper->credentials->sessionId);
            if( ($dbMessage !== null) && ( count($dbMessage->data) > 0 ) ) {
                $dbMessage->data = new ChatPollResponseObject($chatPollReq->department, $dbMessage->data);
                $data[] = $dbMessage;
            }
        }
        
        if( count($data) > 0 ) {
            $dbMsg = new DbMessageObject();
            $dbMsg->code = DbMessageObject::CODE_MULTIPLE_DB_MESSAGES;
            $dbMsg->msg = MessagesConstants::OPERATION_SUCCEEDED;
            $dbMsg->data = $data;
            return $dbMsg;
        }
        sleep(3);
    }
};

$wrapper->execute($callback);

?>
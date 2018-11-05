<?php

require_once __DIR__ . '/../constants/types.constants.php';
require_once __DIR__ . '/../objects/chat.msg.object.php';
require_once __DIR__ . '/../objects/chat.poll.request.object.php';
require_once __DIR__ . '/../services/chat.service.php';
require_once __DIR__ . '/../wrappers/request.wrapper.php';

header( 'Content-type: text/html; charset=utf-8' );
$data = new stdclass();
$data->sessionId = "eu9g7gq04kebbr5uinvvfqg5gm";
$data->accessToken = "995f6d8cb3efdc1ec3b819a3ca8cd4d1";
$data->user = new stdClass();
$data->user->username ='admin';

$_POST['credentials'] = $data;
$wrapper = new RequestWrapper();

register_shutdown_function(
    function () {
        echo 'shutdown func <br>';
        echo "The time is " . date("h:i:sa");
        echo '<br>';
        ob_flush();
        flush();
        global $wrapper;
        
        ChatService::CloseStaticConnection($wrapper->dbConn);
        return true;
    }
);

$wrapper->dbConn = ChatService::GetStaticConnection();
$dep = new ChatDepartmentObject(1, 'MANAGEMENT');
$lastMsg = 3;
set_time_limit(30);    //1 minute

$callback = function():DbMessageObject {
    global $wrapper;
    while(true) {
        echo 'start while <br>';
        echo "The time is " . date("h:i:sa");
        echo '<br>';
        $dbMessage = ChatService::GetConversation($dep, $lastMsg, $wrapper->dbConn, false);
        echo 'after ChatService::GetConversation <br>';
        echo "The time is " . date("h:i:sa");
        echo '<br>';
        if( ($dbMessage !== null) && ( count($dbMessage->data) > 0 ) ) {
            //ChatService::CloseStaticConnection($wrapper->dbConn);
            echo 'inside if<br>';
            echo "The time is " . date("h:i:sa");
            echo '<br>';
            var_dump($dbMessage);
            echo '<br>';
            echo "The time is " . date("h:i:sa");
            echo '<br>';
        }
        
        echo 'sleep <br>';
        echo "The time is " . date("h:i:sa");
        echo '<br>';
        sleep(2);
        echo 'good morning <br>';
        echo "The time is " . date("h:i:sa");
        echo '<br>';
    }
};

$wrapper->execute($callback);

?>
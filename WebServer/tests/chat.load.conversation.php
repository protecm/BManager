<?php

require_once __DIR__ . '/../interfaces/network.service.interface.php';
require_once __DIR__ . '/../constants/chat.constants.php';
require_once __DIR__ . '/../objects/chat.msg.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/users.service.php';
require_once __DIR__ . '/../services/data.service.php';

function GetConversationImpl(string $tableName, int $depID, int $fromID):DbMessageObject {
    $tableNameUsers = UsersService::TABLE_NAME_USERS;
    $dbMessage = DataService::SelectData("SELECT {$tableName}.* , {$tableNameUsers}.`name` AS 'user_name'
                        FROM {$tableName}
                        LEFT JOIN {$tableNameUsers}
                        ON {$tableName}.`user_id`={$tableNameUsers}.`id`
                        WHERE {$tableName}.`id`>'{$fromID}' ");
    
    $queryData = $dbMessage->data;
    $data = array();
    while( $row = $queryData->fetch_object() ) {
        $source = new ChatUserObject($row->user_id, $row->user_name);
        //TODO - $destination - get department info
        $destination = new ChatDepartmentObject($depID, '');
        $chatMsg = new ChatMsgObject($row->id, $row->sent_on, $source, $destination, $row->msg);
        
        $data[] = $chatMsg;
    }
    $dbMessage->data = $data;
    return $dbMessage;
}

$dbMessage = GetConversationImpl("`chat_box_monitor`", 3, 3);

// echo count($dbMessage->data);
// echo '<br><br>';
// var_dump($dbMessage);

header('Content-type:application/json;charset=utf-8');
echo json_encode($dbMessage);

?>
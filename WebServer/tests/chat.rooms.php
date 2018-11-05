<?php

require_once __DIR__ . '/../objects/chat.msg.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/data.service.php';
require_once __DIR__ . '/../services/chat.service.php';

$tableName = ChatService::TABLE_NAME_CHAT_ROOMS;
$dbMessage = DataService::SelectData("SELECT *
                        FROM {$tableName}");

$queryData = $dbMessage->data;
$data = array();
while( $row = $queryData->fetch_object() ) {
    $room = new ChatDepartmentObject($row->id, $row->name);
    $data[] = $room;
}
return $dbMessage;

?>
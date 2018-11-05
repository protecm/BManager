<?php

require_once __DIR__ . '/../interfaces/network.service.interface.php';
require_once __DIR__ . '/../constants/chat.constants.php';
require_once __DIR__ . '/../objects/chat.msg.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/users.service.php';
require_once __DIR__ . '/../services/data.service.php';

class ChatService implements NetworkServiceInterface {
    
    //For each department we have a table, by the table name we can know the department id!.
    const TABLE_NAME_CHAT_ROOMS = "`chat_rooms`";
    const TABLE_NAME_CHAT_BOX_MANAGEMENT = "`chat_box_management`";
    const TABLE_NAME_CHAT_BOX_ORDERS = "`chat_box_orders`";
    const TABLE_NAME_CHAT_BOX_MONITOR = "`chat_box_monitor`";
    const TABLE_NAME_CHAT_BOX_DELIVERIES = "`chat_box_deliveries`";
    
    public static function SendMessage(string $sessionId, ChatMsgObject $chatMsg):DbMessageObject {
        $depID = $chatMsg->destination->id;
        switch($depID) {
            case (ChatConstants::DEPARTMENT_ID_MANAGEMENT): 
                return ChatService::SendMessageImpl(ChatService::TABLE_NAME_CHAT_BOX_MANAGEMENT, $sessionId, $chatMsg);
            case (ChatConstants::DEPARTMENT_ID_ORDERS):
                return ChatService::SendMessageImpl(ChatService::TABLE_NAME_CHAT_BOX_ORDERS, $sessionId, $chatMsg);
            case (ChatConstants::DEPARTMENT_ID_MONITOR):
                return ChatService::SendMessageImpl(ChatService::TABLE_NAME_CHAT_BOX_MONITOR, $sessionId, $chatMsg);
            case (ChatConstants::DEPARTMENT_ID_DELIVERIES):
                return ChatService::SendMessageImpl(ChatService::TABLE_NAME_CHAT_BOX_DELIVERIES, $sessionId, $chatMsg);
            default:
                break;
        }
        return null;
    }
    
    private static function SendMessageImpl(string $tableName, string $sessionId, ChatMsgObject $chatMsg):DbMessageObject {
        $dbMessage = DataService::InsertData( "INSERT INTO {$tableName} (`id` , `sent_on` , `user_id` , `session_id` , `msg` )
                        VALUES( '{$chatMsg->id}' , '{$chatMsg->sentOn}' , '{$chatMsg->source->id}' , '{$sessionId}' , '{$chatMsg->msg}')", 
                        true);
        return $dbMessage;
    }
    
    public static function GetConversation(ChatDepartmentObject $chatDep, int $fromID = 0, string $sessionId = ""):DbMessageObject {
        //TODO - Get limit parameter - max number of messages
        //TODO - add conversation call add from id & limit of message
        $depID = $chatDep->id;
        switch($depID) {
            case (ChatConstants::DEPARTMENT_ID_MANAGEMENT):
                return ChatService::GetConversationImpl(ChatService::TABLE_NAME_CHAT_BOX_MANAGEMENT, $depID, $fromID, $sessionId);
            case (ChatConstants::DEPARTMENT_ID_ORDERS):
                return ChatService::GetConversationImpl(ChatService::TABLE_NAME_CHAT_BOX_ORDERS, $depID, $fromID, $sessionId);
            case (ChatConstants::DEPARTMENT_ID_MONITOR):
                return ChatService::GetConversationImpl(ChatService::TABLE_NAME_CHAT_BOX_MONITOR, $depID, $fromID, $sessionId);
            case (ChatConstants::DEPARTMENT_ID_DELIVERIES):
                return ChatService::GetConversationImpl(ChatService::TABLE_NAME_CHAT_BOX_DELIVERIES, $depID, $fromID, $sessionId);
            default:
                break;
        }
        return null;
    }
    
    private static function GetConversationImpl(string $tableName, int $depID, int $fromID, string $sessionId):DbMessageObject {
        $tableNameUsers = UsersService::TABLE_NAME_USERS;
        $dbMessage = DataService::SelectData("SELECT {$tableName}.* , {$tableNameUsers}.`name` AS 'user_name'  
                        FROM {$tableName} 
                        LEFT JOIN {$tableNameUsers} 
                        ON {$tableName}.`user_id`={$tableNameUsers}.`id` 
                        WHERE {$tableName}.`id`>'{$fromID}' AND {$tableName}.`session_id`!='{$sessionId}'");
        
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
    
    public static function GetChatRooms():DbMessageObject {
        //TODO - Get chat rooms according to user permissions
        $tableName = ChatService::TABLE_NAME_CHAT_ROOMS;
        $dbMessage = DataService::SelectData("SELECT * 
                        FROM {$tableName}");
        
        $queryData = $dbMessage->data;
        $data = array();
        while( $row = $queryData->fetch_object() ) {
            $room = new ChatDepartmentObject($row->id, $row->name);
            $data[] = $room;
        }
        $dbMessage->data = $data;
        return $dbMessage;
    }
    
    public static function Deserialize(string $baseData):ChatMsgObject {
        $chatMsgStr = base64_decode($baseData);
        $chatMsgDTO = json_decode($chatMsgStr);
        
        return ChatService::FromDTO($chatMsgDTO);
    }
    
    public static function FromDTO($dto):ChatMsgObject {
        $source = new ChatUserObject($dto->source->id, $dto->source->name);
        $destination = new ChatDepartmentObject($dto->destination->id, $dto->destination->name);
        
        return new ChatMsgObject($dto->id, $dto->sentOn, $source, $destination, $dto->msg);
    }
}


?>
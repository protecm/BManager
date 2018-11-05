<?php

require_once __DIR__ . '/../interfaces/network.object.interface.php';

class ChatPollRequestObject implements NetworkObjectInterface {
    
    public $department;
    public $clientLastMsgID;
    
    function __construct(ChatDepartmentObject $department, int $clientLastMsgID) {
        $this->department = $department;
        $this->clientLastMsgID = $clientLastMsgID;
    }
    
    public function serialize():string {
        $data = new stdclass();
        return json_encode($data);
    }
    
    public static function FromBase($baseData, int $type):ChatPollRequestObject {
        $chatPollReqStr = base64_decode($baseData);
        $chatPollReqDTO = json_decode($chatPollReqStr);
        
        return ChatPollRequestObject::FromDTO($chatPollReqDTO, $type);
    }
    
    public static function FromDTO($dto, int $type):ChatPollRequestObject {
        $department = new ChatDepartmentObject($dto->department->id, $dto->department->name);
        return new ChatPollRequestObject($department, $dto->clientLastMsgID);
    }
}

class ChatPollRequestGroupObject implements NetworkObjectInterface {
    
    /** 
     * Array of ChatPollRequestObject
     * 
     * @var ChatPollRequestObject[] 
     */
    public $data;
    
    function __construct() {
        $this->data = array();
    }
    
    public function serialize():string {
        $data = new stdclass();
        return json_encode($data);
    }
    
    public static function FromBase($baseData, int $type):ChatPollRequestGroupObject {
        $chatPollReqGroupStr = base64_decode($baseData);
        $chatPollReqGroupDTO = json_decode($chatPollReqGroupStr);
        
        return ChatPollRequestGroupObject::FromDTO($chatPollReqGroupDTO, $type);
    }
    
    public static function FromDTO($dto, int $type):ChatPollRequestGroupObject {
        $chatPollReqGroup = new ChatPollRequestGroupObject();
        $dataDTO = $dto->data;
        
        foreach ($dataDTO as $chatPollReqDTO) {
            $chatPollReq = ChatPollRequestObject::FromDTO($chatPollReqDTO, $type);
            $chatPollReqGroup->data[] = $chatPollReq;
        }
        
        return $chatPollReqGroup;
    }
}

?>
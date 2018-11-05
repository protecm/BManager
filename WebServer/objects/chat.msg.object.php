<?php

require_once __DIR__ . '/../interfaces/network.object.interface.php';

class ChatUserObject {
    public $id;
    public $name;
    
    function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }
}

class ChatDepartmentObject implements NetworkObjectInterface {
    public $id;
    public $name;
    
    function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }
    
    public function serialize():string {
        $data = new stdclass();
        return json_encode($data);
    }
    
    public static function FromBase($baseData, int $type):ChatDepartmentObject {
        $chatDepStr = base64_decode($baseData);
        $chatDepDTO = json_decode($chatDepStr);
        
        return ChatDepartmentObject::FromDTO($chatDepDTO, $type);
    }
    
    public static function FromDTO($dto, int $type):ChatDepartmentObject {
        return new ChatDepartmentObject($dto->id, $dto->name);
    }
}

class ChatMsgObject {
    
    public $id;
    public $sentOn;
    public $source;
    public $destination;
    public $msg;
    
    function __construct(?int $id, string $sentOn, ChatUserObject $source, ChatDepartmentObject $destination, string $msg) {
        $this->id = $id;
        $this->sentOn = $sentOn;
        $this->source = $source;
        $this->destination = $destination;
        $this->msg = $msg;
    }
}
?>
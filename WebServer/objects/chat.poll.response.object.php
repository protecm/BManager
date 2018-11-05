<?php

class ChatPollResponseObject {
    
    public $department;
    public $msgs;
    
    /**
     * Constructor
     *
     * @param ChatDepartmentObject $department
     * @param ChatMsgObject[] $msgs
     */
    function __construct(ChatDepartmentObject $department, $msgs) {
        $this->department = $department;
        $this->msgs = $msgs;
    }
}

?>
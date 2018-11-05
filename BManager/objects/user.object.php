<?php

class UserObject {
    
    public $id;
    public $username;
    public $password;
    public $userAccess;
    public $isDeleted;
    
    function __construct(?int $id, string $username, string $password, UserAccessObject $userAccess = null, bool $isDeleted = false) {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->userAccess = $userAccess;
        $this->isDeleted = $isDeleted;
    }
    
    public function isActive():bool {
        return !$this->isDeleted;
    }
    
}

?>
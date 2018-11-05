<?php

require_once __DIR__ . '/../interfaces/network.object.interface.php';
require_once __DIR__ . '/../interfaces/sql.filter.interface.php';
require_once __DIR__ . '/../services/users.service.php';

class UserFilterObject implements NetworkObjectInterface,SqlFilterInterface {
    
    public $username;
    public $password;
    public $isDeleted;
    
    function __construct(?bool $isDeleted) {
        $this->isDeleted = $isDeleted ? 1:0;
    }
    
    public function toSqlString(string $tableName = UsersService::TABLE_NAME_USERS) {
        //	TODO - Handle condition that filter is empty, all parameters are null
        $data = array();
        
        if( isset($this->username) && !empty($this->username) ) {
            $data[] = "{$tableName}.`name` = '{$this->username}'";
        }
        
        if( isset($this->password) && !empty($this->password) ) {
            $data[] = "{$tableName}.`password` = '{$this->password}'";
        }
        
        if( isset($this->isDeleted) ) {
            $data[] = "{$tableName}.`is_deleted` = '{$this->isDeleted}'";
        }
        
        return implode(' AND ', $data);
    }
    
    public static function FromUser(UserObject $user):UserFilterObject {
        $filter = new UserFilterObject($user->isDeleted);
        $filter->username = $user->username;
        $filter->password = $user->password;
        
        return $filter;
    }
    
    public function serialize():string {
        $data = new stdclass();
        return json_encode($data);
    }
    
    public static function FromBase($baseData, int $type):UserFilterObject {
        $filterStr = base64_decode($baseData);
        $filterDTO = json_decode($filterStr);
        
        return UserFilterObject::FromDTO($filterDTO, $type);
    }
    
    public static function FromDTO($dto, int $type):UserFilterObject {
        return new UserFilterObject($dto->isDeleted);
    }
}

?>
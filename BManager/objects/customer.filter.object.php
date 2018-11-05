<?php

require_once __DIR__ . '/../interfaces/network.object.interface.php';
require_once __DIR__ . '/../interfaces/sql.filter.interface.php';
require_once __DIR__ . '/../services/customers.service.php';

class CustomerFilterObject implements NetworkObjectInterface,SqlFilterInterface {
    
    public $name;
    public $isDeleted;
    
    function __construct($customerFilterDTO) {
        $this->name = $customerFilterDTO->name;
        $this->isDeleted = $customerFilterDTO->isDeleted ? 1:0;
    }
    
    public function toSqlString(string $tableName = CustomersService::TABLE_NAME_CUSTOMERS) {
        //	TODO - Handle condition that filter is empty, all parameters are null
        $data = array();
        
        if( isset($this->name) && !empty($this->name) ) {
            $data[] = "{$tableName}.`name` LIKE '%{$this->name}%'";
        }
        
        if( isset($this->isDeleted) ) {
            $data[] = "{$tableName}.`is_deleted` = '{$this->isDeleted}'";
        }
        
        return implode(' AND ', $data);
    }
    
    public function serialize():string {
        $data = new stdclass();
        return json_encode($data);
    }
    
    public static function FromBase($baseData, int $type):CustomerFilterObject {
        $filterStr = base64_decode($baseData);
        $filterDTO = json_decode($filterStr);
        
        return CustomerFilterObject::FromDTO($filterDTO, $type);
    }
    
    public static function FromDTO($dto, int $type):CustomerFilterObject {
        return new CustomerFilterObject($dto);
    }
}

?>
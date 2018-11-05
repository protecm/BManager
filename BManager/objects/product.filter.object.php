<?php

require_once __DIR__ . '/../interfaces/network.object.interface.php';
require_once __DIR__ . '/../interfaces/sql.filter.interface.php';
require_once __DIR__ . '/../services/products.service.php';

class ProductFilterObject implements NetworkObjectInterface,SqlFilterInterface {
    
    public $name;
    public $category;   //this is code value, DTO contain's object
    public $isDeleted;
    
    function __construct($productFilterDTO) {
        $this->name = $productFilterDTO->name;
        $this->category = ( isset($productFilterDTO->category) ? $productFilterDTO->category->id:null );
        $this->isDeleted = $productFilterDTO->isDeleted ? 1:0;
    }
    
    public function toSqlString(string $tableName = ProductsService::TABLE_NAME_PRODUCTS) {
        //	TODO - Handle condition that filter is empty, all parameters are null
        $data = array();
        
        if( isset($this->name) && !empty($this->name) ) {
            $data[] = "{$tableName}.`name` LIKE '%{$this->name}%'";
        }
        
        if( isset($this->category) && !empty($this->category) ) {
            $data[] = "{$tableName}.`category_id` = '{$this->category}'";
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
    
    public static function FromBase($baseData, int $type):ProductFilterObject {
        $filterStr = base64_decode($baseData);
        $filterDTO = json_decode($filterStr);
        
        return ProductFilterObject::FromDTO($filterDTO, $type);
    }
    
    public static function FromDTO($dto, int $type):ProductFilterObject {
        return new ProductFilterObject($dto);
    }
}

?>
<?php

require_once __DIR__ . '/../interfaces/sql.filter.interface.php';
require_once __DIR__ . '/../services/orders.service.php';

class OrderRowFilterObject implements SqlFilterInterface{
    //  Filter parameters
    public $orderId;
    public $orderVersion;
    public $productId;
    
    function __construct(int $orderId, int $orderVersion, ?int $productId) {
        $this->orderId = $orderId;
        $this->orderVersion = $orderVersion;
        $this->productId = $productId;
    }
    
    public function toSqlString(string $tableName = OrdersService::TABLE_NAME_ORDER_ROWS) {
        $data = array();
        
        if( isset($this->orderId) ) {
            $data[] = "{$tableName}.`order_id` = '{$this->orderId}'";
        }
        
        if( isset($this->orderVersion) ) {
            $data[] = "{$tableName}.`order_version` = '{$this->orderVersion}'";
        }
        
        if( isset($this->productId) ) {
            $data[] = "{$tableName}.`product_id` = '{$this->productId}'";
        }
        
        if( count($data) === 0) {
            $data[] = '1 = 1';          //we should have at least 1 condition for the query to be valid
        }
        
        return implode(' AND ', $data);
    }
}
?>
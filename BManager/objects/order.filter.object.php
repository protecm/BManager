<?php

require_once __DIR__ . '/../interfaces/network.object.interface.php';
require_once __DIR__ . '/../interfaces/sql.filter.interface.php';
require_once __DIR__ . '/../services/orders.service.php';

class OrderFilterObject implements NetworkObjectInterface,SqlFilterInterface {

	//  Filter parameters
	public $orderFromDate;
	public $orderToDate;
	public $supplyToDate;
	public $statusLessThan;        //this is code value, DTO contain's object
	public $statusGreaterThan;     //this is code value, DTO contain's object
	
	public $status;                //this is code value, DTO contain's object
	public $product;               //this is code value, DTO contain's object
	public $customer;              //this is code value, DTO contain's object
	
	//  Client Information
	public $clientDateTime;

	function __construct($orderFilterDTO) {
		$this->orderFromDate = $orderFilterDTO->orderFromDate;
		$this->orderToDate = $orderFilterDTO->orderToDate;
		$this->supplyToDate = $orderFilterDTO->supplyToDate;
		$this->statusLessThan = ( isset($orderFilterDTO->statusLessThan) ? $orderFilterDTO->statusLessThan->code:null );
		$this->statusGreaterThan = ( isset($orderFilterDTO->statusGreaterThan) ? $orderFilterDTO->statusGreaterThan->code:null );
		
		$this->status = ( isset($orderFilterDTO->status) ? $orderFilterDTO->status->code:null );
		$this->customer = ( isset($orderFilterDTO->customer) ? $orderFilterDTO->customer->id:null );
		$this->product = ( isset($orderFilterDTO->product) ? $orderFilterDTO->product->id:null );
		
		$this->clientDateTime = $orderFilterDTO->clientDateTime;
	}
	
	public function toSqlString(string $tableName = OrdersService::TABLE_NAME_ORDERS) {
		$data = array();
		
		if( isset($this->orderFromDate) ) {
			$data[] = "{$tableName}.`order_date` >= '{$this->orderFromDate}'";
		}
		
		if( isset($this->orderToDate) ) {
			$data[] = "{$tableName}.`order_date` <= '{$this->orderToDate}'";
		}
		
		if( isset($this->supplyToDate) ) {
			$data[] = "{$tableName}.`supply_date` <= '{$this->supplyToDate}'";
		}
		
		if( isset($this->statusLessThan) ) {
			$data[] = "{$tableName}.`status` < '{$this->statusLessThan}'";
		}
		
		if( isset($this->statusGreaterThan) ) {
			$data[] = "{$tableName}.`status` > '{$this->statusGreaterThan}'";
		}
		
		if( isset($this->status) ) {
		    $data[] = "{$tableName}.`status` = '{$this->status}'";
		}
		
		if( isset($this->customer) ) {
		    $data[] = "{$tableName}.`customer_id` = '{$this->customer}'";
		}
		
		if( count($data) === 0) {
		    $data[] = '1 = 1';          //we should have at least 1 condition for the query to be valid
		}
		
		return implode(' AND ', $data);
	}
	
	public function serialize():string {
	    $data = new stdclass();
	    return json_encode($data);
	}
	
	public static function FromBase($baseData, int $type):OrderFilterObject {
	    $filterStr = base64_decode($baseData);
	    $filterDTO = json_decode($filterStr);
	    
	    return OrderFilterObject::FromDTO($filterDTO, $type);
	}
	
	public static function FromDTO($dto, int $type):OrderFilterObject {
	    return new OrderFilterObject($dto);
	}
}
?>
<?php

class OrderObject {

	public $id;
	public $version;
	public $customer;
	public $orderDate;
	public $supplyDate;
	public $notes;
	public $orderRows;
	public $status;

	function __construct(?int $id, int $version, CustomerObject $customer, string $orderDate, string $supplyDate,
	    OrderNoteObject $notes, $orderRows, $status) {
	    
		$this->id = $id;
		$this->version = $version;
		$this->customer = $customer;
		$this->orderDate = $orderDate;
		$this->supplyDate = $supplyDate;
		$this->notes = $notes;
		$this->orderRows = $orderRows;
		$this->status = $status;
	}
}

?>

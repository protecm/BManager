<?php

class OrderRowObject {

	public $orderId;
	public $orderVersion;
	public $rowNumber;
	public $product;
	public $amount;
	public $notes;
	public $status;

	function __construct(?int $orderId, int $orderVersion, int $rowNumber, ProductObject $product, 
	    int $amount, OrderNoteObject $notes, $status) {
	    //TODO - type hint for $status  = StatusObject 
		$this->orderId = $orderId;
		$this->orderVersion = $orderVersion;
		$this->rowNumber = $rowNumber;
		$this->product = $product;
		$this->amount = $amount;
		$this->notes = $notes;
		$this->status = $status;
	}
}

?>
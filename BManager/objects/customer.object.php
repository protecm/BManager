<?php

class CustomerObject {

	public $id;
	public $name;
	public $phone;
	public $isDeleted;

	function __construct(?int $id, string $name, string $phone, bool $isDeleted) {
		$this->id = $id;
		$this->name = $name;
		$this->phone = $phone;
		$this->isDeleted = $isDeleted;
	}
}

?>
<?php
class CategoryObject {
	
	public $id;            //int or null
	public $name;          //string
	public $isDeleted;     //bool, in the database TinyInt
	
	function __construct(?int $id, string $name, bool $isDeleted) {
		$this->id = $id;
		$this->name = $name;
		$this->isDeleted = $isDeleted;
	}
}
?>
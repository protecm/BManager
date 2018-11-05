<?php

class ProductObject {
	
	public $id;
	public $category;
	public $name;
	public $isDeleted;
	
	function __construct(?int $id, CategoryObject $category, string $name, bool $isDeleted) {
		$this->id = $id;
		$this->category = $category;
		$this->name = $name;
		$this->isDeleted = $isDeleted;
	}
}
?>
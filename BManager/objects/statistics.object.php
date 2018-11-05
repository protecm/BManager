<?php

class StatisticsObject {
	
	public $general;
	public $onDelay;
	
	function __construct($general, $onDelay) {
		$this->general = $general;
		$this->onDelay = $onDelay;
	}
}
?>
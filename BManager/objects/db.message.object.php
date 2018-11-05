<?php

class DbMessageObject {
	
	const CODE_OK = 0;
	const CODE_NOT_OK = 1;
	const CODE_ERROR_COMMUNICATION = 2;
	const CODE_MULTIPLE_DB_MESSAGES = 3;
	const CODE_MYSQL_DUPLICATE_KEY = 1062;
	
	public $code;
	public $msg;
	public $data;
	
	function __construct() {
		$this->code = DbMessageObject::CODE_NOT_OK;
		$this->msg = '';
		$this->data = new stdclass();
	}
	
	public static function IS_SUCCESS_CODE(int $code) :bool {
	    
	    switch($code) {
	        case (DbMessageObject::CODE_OK):
	            return true;
	        case (DbMessageObject::CODE_MULTIPLE_DB_MESSAGES):
	            return true;
	        default:
	            break;
	    }
	    
	    return false;
	}
}
?>
<?php

require_once __DIR__ . '/../interfaces/network.object.interface.php';

class ResponseObject implements NetworkObjectInterface {
	
	const CODE_OK = 0;
	const CODE_NOT_OK = 1;
	const CODE_AUTHENTICATION_FAILED = 2;
	const CODE_FATAL_ERROR = 3;
	
	public $code;
	public $msg;
	public $extraInfo;
	public $data;
	public $dbMsg;
	
	function __construct() {
		$this->code = ResponseObject::CODE_NOT_OK;
		$this->msg = '';
		$this->extraInfo = '';
		$this->data = new stdclass();
		$this->dbMsg = new stdclass();
	}
	
	public function serialize():string {
		$data = new stdclass();
	
		$data->code = $this->code;
		$data->msg = $this->msg;
		$data->extraInfo = $this->extraInfo;
		$data->data = $this->data;
		$data->dbMsg = $this->dbMsg;
	
		return json_encode($data);
	}
	
	public static function FromBase($baseData, int $type) {
	    // NetworkObjectInterface
	}
	
	public static function FromDTO($dto, int $type) {
	    // NetworkObjectInterface
	}
}

?>
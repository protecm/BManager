<?php

require_once __DIR__ . '/../services/data.service.php';
require_once __DIR__ . '/../services/authentication.service.php';
require_once __DIR__ . '/../objects/response.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../constants/messages.constants.php';

class RequestWrapper {
	
    public $dbConn;
	public $response;
	public $postData;
	/**
	 * CredentialsObject
	 *
	 * @var CredentialsObject
	 */
	public $credentials;
	
	function __construct() {
		
	}
	
	public function execute(callable $callback) {
		$this->response = new ResponseObject();
		$this->postData = json_decode(file_get_contents('php://input'), true);
	
		if( isset($this->postData['reqData']) && isset($this->postData['credentials']) ) {
			$credentialsStr = base64_decode($this->postData['credentials']);
			$this->credentials = json_decode($credentialsStr);

			if( AuthenticationService::Authenticate($this->credentials) ) {
			    $this->response->dbMsg = $callback();
			    if( DbMessageObject::IS_SUCCESS_CODE($this->response->dbMsg->code) ) {
			        $this->response->code = ResponseObject::CODE_OK;
			        $this->response->msg = MessagesConstants::OPERATION_SUCCEEDED;
			    }else {
			        $this->response->msg = MessagesConstants::OPERATION_FAILED;
			    }
			}else {
			    //Authentication Failed
				$this->response->code = ResponseObject::CODE_AUTHENTICATION_FAILED;
				$this->response->msg = MessagesConstants::AUTHENTICATION_FAILED;
			}
		}
	
		$this->respond();
	}
	
	private function respond() {
	    header('Content-type:application/json;charset=utf-8');
	    echo $this->response->serialize();
	}
	
	public function errorHandler() {
	    //TODO - code review - handle general errors, not only fatal, check if statement ...
	    $err = error_get_last();
	    if( $err && ($err['type'] === E_ERROR) ) {
	        $this->response->code = ResponseObject::CODE_FATAL_ERROR;
	        $this->response->msg = "Type: {$err['type']}, {$err['message']}, in file {$err['file']} on line {$err['line']}";
	        $this->respond();
	    }
	}
	
}

?>
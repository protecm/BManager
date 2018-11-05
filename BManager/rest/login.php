<?php

require_once __DIR__ . '/../services/authentication.service.php';
require_once __DIR__ . '/../objects/response.object.php';
require_once __DIR__ . '/../constants/messages.constants.php';

$response = new ResponseObject();
$postData = json_decode(file_get_contents('php://input'), true);

if( isset($postData['reqData']) ) {
	$user = UsersService::Deserialize($postData['reqData']);
	$credentials = AuthenticationService::Login($user);
	
	if( isset($credentials) ) {
		$response->code = ResponseObject::CODE_OK;
		$response->msg = MessagesConstants::OPERATION_SUCCEEDED;
		$response->data = $credentials;
	}else {
		$response->msg = MessagesConstants::OPERATION_FAILED;
	}
}

header('Content-type:application/json;charset=utf-8');
echo $response->serialize();

?>
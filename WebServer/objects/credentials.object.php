<?php

class CredentialsObject {
	
	public $sessionId;
	public $user;
	public $accessToken;
	
	function __construct(string $sessionId, UserObject $user,string $accessToken) {
		$this->sessionId = $sessionId;
		$this->user = $user;
		$this->accessToken = $accessToken;
	}
}

?>
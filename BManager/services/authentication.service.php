<?php

require_once __DIR__ . '/../objects/credentials.object.php';
require_once __DIR__ . '/../objects/user.object.php';
require_once __DIR__ . '/../objects/user.filter.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/users.service.php';

class AuthenticationService {
	
    public static function Login(UserObject $user):?CredentialsObject {
		if ( empty( session_id() ) ) {
			session_start();
		}
		
		$user->password = md5($user->password);
		$filter = UserFilterObject::FromUser($user);
		$dbMessage = UsersService::GetUser($filter);
		
		if ( ($dbMessage->code === DbMessageObject::CODE_OK) && isset($dbMessage->data) ) {
		    $user = $dbMessage->data;
		    
		    if( $user->isActive() ) {
		        $accessToken = md5(uniqid());
		        $_SESSION[$accessToken] = $user->username;
		        session_write_close();
		        
		        $credentials = new CredentialsObject(session_id(),$user,$accessToken);
		        return $credentials;
		    }
		}

		return null;
	}
	
	public static function Authenticate($credentials):bool {
	    //TODO - add typing for $credentials
		ini_set('session.use_strict_mode', 0);
		session_id($credentials->sessionId);
		session_start();
		session_write_close();
		
		if( isset( $_SESSION[$credentials->accessToken] ) ) {
		    return $_SESSION[$credentials->accessToken] === $credentials->user->username;
		}
		
		return false;
	}
}

?>
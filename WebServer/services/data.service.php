<?php

require_once __DIR__ . '/../constants/database.constants.php';
require_once __DIR__ . '/../constants/messages.constants.php';
require_once __DIR__ . '/../objects/db.message.object.php';

class DataService {
    
    public static function GetTimeStamp():int {
        $date = new DateTime();
        return $date->getTimestamp();
    }
    
    public static function SelectData(string $sql):DbMessageObject {
        $dbMsg = new DbMessageObject();
		$conn = DataService::GetDefaultConnection();
		
		// Check connection
		if ($conn->connect_errno) {
			$dbMsg->code = DbMessageObject::CODE_ERROR_COMMUNICATION;
			$dbMsg->msg = $conn->connect_error;
			return $dbMsg;
		}
		$result = DataService::ExecuteQuery($conn, $sql);
		$dbMsg->code = DbMessageObject::CODE_OK;
		$dbMsg->msg = MessagesConstants::OPERATION_SUCCEEDED;
		$dbMsg->data = $result;
		
		DataService::CloseConnection($conn);
		return $dbMsg;
	}
	
	public static function InsertData(string $sql):DbMessageObject {
		$dbMsg = new DbMessageObject();
		$conn = DataService::GetDefaultConnection();
		
		// Check connection
		if ($conn->connect_errno) {
			$dbMsg->code = DbMessageObject::CODE_ERROR_COMMUNICATION;
			$dbMsg->msg = $conn->connect_error;
			return $dbMsg;
		}
		
		$result = DataService::ExecuteQuery($conn, $sql);
		if ($result === TRUE) {
			$dbMsg->code = DbMessageObject::CODE_OK;
			$dbMsg->msg = MessagesConstants::OPERATION_SUCCEEDED;
			$dbMsg->data = $conn->insert_id;
		} else {
			$dbMsg->code = $conn->errno;
			$dbMsg->msg = $conn->error;
		}
		
		DataService::CloseConnection($conn);	
		return $dbMsg;
	}
	
	public static function UpdateData(string $sql):DbMessageObject {
		$dbMsg = new DbMessageObject();
		$conn = DataService::GetDefaultConnection();
	
		// Check connection
		if ($conn->connect_errno) {
			$dbMsg->code = DbMessageObject::CODE_ERROR_COMMUNICATION;
			$dbMsg->msg = $conn->connect_error;
			return $dbMsg;
		}
	
		$result = DataService::ExecuteQuery($conn, $sql);
		if ($result === TRUE) {
			$dbMsg->code = DbMessageObject::CODE_OK;
			$dbMsg->msg = MessagesConstants::OPERATION_SUCCEEDED;
			$dbMsg->data = $conn->affected_rows;
		} else {
			$dbMsg->code = $conn->errno;
			$dbMsg->msg = $conn->error;
		}
	
		DataService::CloseConnection($conn);
		return $dbMsg;
	}
	
	public static function DeleteData(string $sql):DbMessageObject {
		$dbMsg = new DbMessageObject();
		$conn = DataService::GetDefaultConnection();
	
		// Check connection
		if ($conn->connect_errno) {
			$dbMsg->code = DbMessageObject::CODE_ERROR_COMMUNICATION;
			$dbMsg->msg = $conn->connect_error;
			return $dbMsg;
		}
	
		$result = DataService::ExecuteQuery($conn, $sql);
		if ($result === TRUE) {
			$dbMsg->code = DbMessageObject::CODE_OK;
			$dbMsg->msg = MessagesConstants::OPERATION_SUCCEEDED;
			$dbMsg->data = $conn->affected_rows;
		} else {
			$dbMsg->code = $conn->errno;
			$dbMsg->msg = $conn->error;
		}
	
		DataService::CloseConnection($conn);
		return $dbMsg;
	}
	
	private static function GetDefaultConnection():mysqli {
		$conn = DataService::CreateConnection(
				DatabaseConstants::SERVER_NAME,
				DatabaseConstants::USERNAME,
				DatabaseConstants::PASSWORD,
				DatabaseConstants::DB_NAME);
		
		return $conn;
	}
	
	private static function CreateConnection(string $serverName, string $username, string $password, string $dbName):mysqli {
		$conn = new mysqli($serverName, $username, $password, $dbName);
		return $conn;
	}
	
	private static function ExecuteQuery(mysqli $conn, string $sql) {
	    //Synced Mode
		$result = $conn->query($sql);
		return $result;
	}
	
	public static function CloseConnection(mysqli $conn) {
		$conn->close();
	}
	
}
?>
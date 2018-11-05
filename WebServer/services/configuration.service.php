<?php

require_once __DIR__ . '/../interfaces/network.service.interface.php';
require_once __DIR__ . '/../objects/configuration.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/data.service.php';

class ConfigurationService implements NetworkServiceInterface {
    
    const TABLE_NAME_SETTINGS = "`settings`";

	public static function GetConfigurations():DbMessageObject {
	    $tableName = ConfigurationService::TABLE_NAME_SETTINGS;
		$dbMessage = DataService::SelectData("SELECT * FROM {$tableName}");

		$queryData = $dbMessage->data;
		$data = array();
		while( $row = $queryData->fetch_object() ) {
			$data[$row->name] = $row->value;
		}
		$dbMessage->data = $data;
		return $dbMessage;
	}
	
	public static function EditConfigurations(EditTicketObject $ticket):DbMessageObject {
	    $tableName = ConfigurationService::TABLE_NAME_SETTINGS;
		$orgConf = $ticket->orgObject;
		$edtConf = $ticket->edtObject;

		$dbMessage = DataService::UpdateData( "UPDATE {$tableName} 
                SET `value` = (CASE 
                    WHEN `name`='monitor_active_order_hours' then '{$edtConf->monitorActiveOrderHours}'
                    WHEN `name`='monitor_refresh_rate_minutes' then '{$edtConf->monitorRefreshRateMinutes}'
                    WHEN `name`='deliveries_refresh_rate_minutes' then '{$edtConf->deliveriesRefreshRateMinutes}'
                    WHEN `name`='comments_enforcement' then '{$edtConf->commentsEnforcement}'
                    WHEN `name`='chat_mode' then '{$edtConf->chatMode}'
                    ELSE `value`
                    END)" );
	
		return $dbMessage;
	}
	
	public static function Deserialize(string $baseData):ConfigurationObject {
	    $confStr = base64_decode($baseData);
	    $confDTO = json_decode($confStr);
	    return ConfigurationService::FromDTO($confDTO);
	}
	
	public static function FromDTO($dto):ConfigurationObject {
	    return new ConfigurationObject($dto->monitorActiveOrderHours, $dto->monitorRefreshRateMinutes, 
	        $dto->deliveriesRefreshRateMinutes, $dto->commentsEnforcement, $dto->chatMode);
	}
}
?>
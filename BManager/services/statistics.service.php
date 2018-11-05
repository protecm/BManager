<?php

require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/data.service.php';
require_once __DIR__ . '/../objects/order.filter.object.php';
require_once __DIR__ . '/../objects/statistics.object.php';

class StatisticsService {
	
	public static function GetStatistics(OrderFilterObject $filter):DbMessageObject {
		//	TODO - validation - check if there are problem in the requests...
		//		   before sending second reuquest.
		$dbMessage = StatisticsService::GetStatisticsGeneral($filter);
		$general = $dbMessage->data;
		
		$dbMessage = StatisticsService::GetStatisticsOnDelay($filter);
		$onDelay = $dbMessage->data;
		
		$dbMessage->data = new StatisticsObject($general, $onDelay);
		return $dbMessage;
	}
	
	private static function GetStatisticsGeneral(OrderFilterObject $filter):DbMessageObject {
		$tableName = OrdersService::TABLE_NAME_ORDERS;
		$queryCondition = $filter->toSqlString($tableName);
		
		$dbMessage = DataService::SelectData("SELECT `status`,COUNT(`status`) AS 'count'
				FROM {$tableName}
				WHERE {$queryCondition}
				GROUP BY `status`");
		
		$queryData = $dbMessage->data;
		$data = array();
		while( $row = $queryData->fetch_assoc() ) {
			$data[] = $row;
		}
		$dbMessage->data = $data;
		return $dbMessage;
	}
	
	private static function GetStatisticsOnDelay(OrderFilterObject $filter):DbMessageObject {
		$tableName = OrdersService::TABLE_NAME_ORDERS;
		$queryCondition = $filter->toSqlString($tableName);
		$clientDateTime = $filter->clientDateTime;
		
		$dbMessage = DataService::SelectData("SELECT `status`,COUNT(`status`) AS 'count'
				FROM {$tableName}
				WHERE {$queryCondition} AND {$tableName}.`supply_date` < '{$clientDateTime}'
				GROUP BY `status`");
		
		$queryData = $dbMessage->data;
		$data = array();
		while( $row = $queryData->fetch_assoc() ) {
			$data[] = $row;
		}
		$dbMessage->data = $data;
		return $dbMessage;
	}
	
}
?>
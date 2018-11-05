<?php

require_once __DIR__ . '/../interfaces/network.service.interface.php';
require_once __DIR__ . '/../objects/category.object.php';
require_once __DIR__ . '/../objects/product.object.php';
require_once __DIR__ . '/../objects/customer.object.php';
require_once __DIR__ . '/../objects/order.note.object.php';
require_once __DIR__ . '/../objects/order.row.object.php';
require_once __DIR__ . '/../objects/order.object.php';
require_once __DIR__ . '/../objects/order.row.filter.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/customers.service.php';
require_once __DIR__ . '/../services/products.service.php';
require_once __DIR__ . '/../services/categories.service.php';
require_once __DIR__ . '/../services/data.service.php';

class OrdersService implements NetworkServiceInterface {
	
	const TABLE_NAME_ORDERS = "`orders`";
	const TABLE_NAME_ORDER_ROWS = "`order_rows`";
	const TABLE_NAME_HISTORY_ORDERS = "`orders_history`";
	const TABLE_NAME_HISTORY_ORDER_ROWS = "`order_rows_history`";
	
	public static function GetCommonProducts(int $limit = 5):DbMessageObject {
	    $tableRowsName = OrdersService::TABLE_NAME_ORDER_ROWS;
	    $tableProducts = ProductsService::TABLE_NAME_PRODUCTS;
	    $tableCategories = CategoriesService::TABLE_NAME_CATEGORIES;
	    
	    $dbMessage = DataService::SelectData("SELECT {$tableRowsName}.`product_id`, 
            COUNT({$tableRowsName}.`product_id`) AS 'count', {$tableProducts}.`category_id`, 
           {$tableProducts}.`name` AS 'product_name', {$tableProducts}.`is_deleted` AS 'product_is_deleted', 
	       {$tableCategories}.`name` AS 'category_name', {$tableCategories}.`is_deleted` AS 'category_is_deleted'
            FROM {$tableRowsName} 
            LEFT JOIN {$tableProducts} 
            ON {$tableRowsName}.`product_id`={$tableProducts}.`id` 
            LEFT JOIN {$tableCategories} 
            ON {$tableProducts}.`category_id`={$tableCategories}.`id` 
            WHERE {$tableProducts}.`is_deleted`='0' 
            GROUP BY {$tableRowsName}.`product_id` 
            ORDER BY `count` DESC 
            LIMIT {$limit}");
	    
	    $queryData = $dbMessage->data;
	    $data = array();
	    while( $row = $queryData->fetch_object() ) {
	        $category = new CategoryObject($row->category_id, $row->category_name, $row->category_is_deleted);
	        $product = new ProductObject($row->product_id, $category, $row->product_name, $row->product_is_deleted);
	        $data[] = $product;
	    }
	    
	    $dbMessage->data = $data;
	    return $dbMessage;
	}

	public static function GetOrders(OrderFilterObject $filter, string $tableName = OrdersService::TABLE_NAME_ORDERS, 
	    string $tableRowsName = OrdersService::TABLE_NAME_ORDER_ROWS):DbMessageObject {
	    
	    $tableCustomersName = CustomersService::TABLE_NAME_CUSTOMERS;
		$queryCondition = $filter->toSqlString($tableName);
		
		$dbMessage = DataService::SelectData("SELECT {$tableName}.*, {$tableCustomersName}.`name` AS 'customer_name', 
				{$tableCustomersName}.`phone` AS 'customer_phone', {$tableCustomersName}.`is_deleted` AS 'customer_is_deleted'
				FROM {$tableName} 
				LEFT JOIN {$tableCustomersName}
				ON {$tableName}.`customer_id`={$tableCustomersName}.`id`
				WHERE {$queryCondition}
				ORDER BY {$tableName}.`id` ASC");

		$queryData = $dbMessage->data;
		$data = array();
		while( $row = $queryData->fetch_object() ) {
			$customer = new CustomerObject($row->customer_id, $row->customer_name, $row->customer_phone, $row->customer_is_deleted);
			$notes = new OrderNoteObject($row->notes, $row->is_notes_resolved);
			
			$orderRowsFilter = new OrderRowFilterObject($row->id, $row->version, $filter->product);
			$orderRowsDbMessage = OrdersService::GetOrderRows($orderRowsFilter, $tableRowsName);
			$orderRows = $orderRowsDbMessage->data;
			if( count($orderRows) < 1 ) {
			    continue;
			}
			$order = new OrderObject($row->id, $row->version, $customer, $row->order_date, $row->supply_date, $notes, $orderRows, $row->status);
			$data[] = $order;
		}
		$dbMessage->data = $data;
		return $dbMessage;
	}
	
	public static function GetPreviousOrderVersion(OrderObject $order):DbMessageObject {
		$tableName = OrdersService::TABLE_NAME_HISTORY_ORDERS;
		$tableRowsName = OrdersService::TABLE_NAME_HISTORY_ORDER_ROWS;
		$tableCustomersName = CustomersService::TABLE_NAME_CUSTOMERS;
		
		$dbMessage = DataService::SelectData("SELECT {$tableName}.*, {$tableCustomersName}.`name` AS 'customer_name', 
				{$tableCustomersName}.`phone` AS 'customer_phone', {$tableCustomersName}.`is_deleted` AS 'customer_is_deleted'
				FROM {$tableName} 
				LEFT JOIN `customers`
				ON {$tableName}.`customer_id`=`customers`.`id`
				WHERE {$tableName}.`id`='{$order->id}' AND {$tableName}.`version`=(SELECT MAX(`version`) FROM {$tableName} WHERE `id`='{$order->id}')
				ORDER BY {$tableName}.`id` DESC");
		
		$queryData = $dbMessage->data;
		if( $row = $queryData->fetch_object() ) {
			$customer = new CustomerObject($row->customer_id, $row->customer_name, $row->customer_phone, $row->customer_is_deleted);
			$notes = new OrderNoteObject($row->notes, $row->is_notes_resolved);	

			$orderRowsFilter = new OrderRowFilterObject($row->id, $row->version, null);
			$orderRowsDbMessage = OrdersService::GetOrderRows($orderRowsFilter, $tableRowsName);
			$orderRows = $orderRowsDbMessage->data;
			
			$order = new OrderObject($row->id, $row->version, $customer, $row->order_date, $row->supply_date, $notes, $orderRows, $row->status);
			$dbMessage->data = $order;
		}
		return $dbMessage;
	}
	
	private static function GetOrderRows(OrderRowFilterObject $filter, string $tableName) {
	    $queryCondition = $filter->toSqlString($tableName);
		$dbMessage = DataService::SelectData("SELECT {$tableName}.*, `products`.`category_id`,
				`products`.`name` AS 'product_name', `products`.`is_deleted` AS 'product_is_deleted', 
                `categories`.`name` AS 'category_name', `categories`.`is_deleted` AS 'category_is_deleted' 
				FROM {$tableName} 
				LEFT JOIN `products`
				ON {$tableName}.`product_id`=`products`.`id`
				LEFT JOIN `categories` 
				ON `products`.`category_id`=`categories`.`id`
				WHERE {$queryCondition}");
		
		$queryData = $dbMessage->data;
		$data = array();
		while( $row = $queryData->fetch_object() ) {
		    $category = new CategoryObject($row->category_id, $row->category_name, $row->category_is_deleted);
		    $product = new ProductObject($row->product_id, $category, $row->product_name, $row->product_is_deleted);
		    $notes = new OrderNoteObject($row->notes, $row->is_notes_resolved);
		    
		    $orderRow = new OrderRowObject($row->order_id, $row->order_version, $row->row_num, $product, $row->amount, $notes, $row->status);
			$data[] = $orderRow;
		}
		$dbMessage->data = $data;
		return $dbMessage;
	}

	public static function AddOrder(OrderObject $order, string $tableName = OrdersService::TABLE_NAME_ORDERS,
	    string $tableRowsName = OrdersService::TABLE_NAME_ORDER_ROWS):DbMessageObject {
	    
		$dbMessage = OrdersService::InsertOrder($order,$tableName);

		if($dbMessage->code === DbMessageObject::CODE_OK) {
			$orderId = $dbMessage->data; //auto generated
			$dbMessage = OrdersService::InsertOrderRows($order, $orderId, $tableRowsName);
			$dbMessage->data = $orderId; //Restore the order id for client use.
		}
		
		return $dbMessage;
	}
	
	private static function InsertOrder(OrderObject $order, string $tableName):DbMessageObject {
		$dbMessage = DataService::InsertData( "INSERT INTO {$tableName}
			(`id` , `version` , `customer_id` , `order_date` , `supply_date` , `notes` , `is_notes_resolved` , `status`)
			VALUES( '{$order->id}' , '{$order->version}' , '{$order->customer->id}' , '{$order->orderDate}' ,
			'{$order->supplyDate}' , '{$order->notes->note}' , '{$order->notes->isResolved}' , '{$order->status->code}')" );
		
		return $dbMessage;
	}
	
	private static function InsertOrderRows(OrderObject $order, int $orderId, string $tableName):DbMessageObject {
		$sqlValuesArr = array();
		$orderRows = $order->orderRows;
	
		foreach ($orderRows as $orderRow) {
			$sqlValuesArr[] = "( '{$orderId}' , '{$orderRow->orderVersion}' , '{$orderRow->rowNumber}' , '{$orderRow->product->id}' , '{$orderRow->amount}' ,
			'{$orderRow->notes->note}' , '{$orderRow->notes->isResolved}' , '{$orderRow->status->code}')";
		}
			
		$sqlValues = implode(',', $sqlValuesArr);
		$dbMessage = DataService::InsertData( "INSERT INTO {$tableName}
		(`order_id` , `order_version` , `row_num` , `product_id` , `amount` , `notes` , `is_notes_resolved` , `status`)
		VALUES {$sqlValues}");
	
		return $dbMessage;
	}
		
	public static function EditOrder(EditTicketObject $ticket):DbMessageObject {
		$orgOrder = $ticket->orgObject;
		$edtOrder = $ticket->edtObject;
	
		$dbMessage = DataService::UpdateData( "UPDATE `orders`
				SET `id`='{$edtOrder->id}' , `version`='{$edtOrder->version}' , `customer_id`='{$edtOrder->customer->id}' , 
				`order_date`='{$edtOrder->orderDate}' , `supply_date`='{$edtOrder->supplyDate}' , `notes`='{$edtOrder->notes->note}' , 
				`is_notes_resolved`='{$edtOrder->notes->isResolved}' , `status`='{$edtOrder->status->code}'
				WHERE `id`='{$orgOrder->id}' " );
	
		if($dbMessage->code === DbMessageObject::CODE_OK) {
			$dbMessage = DataService::DeleteData( "DELETE FROM `order_rows` 
					WHERE `order_id`='{$orgOrder->id}'");
			
			$dbMessage = OrdersService::InsertOrderRows($edtOrder, $edtOrder->id, OrdersService::TABLE_NAME_ORDER_ROWS);
		}
		
		if( ($ticket->recordHistory === TRUE) && ($dbMessage->code === DbMessageObject::CODE_OK) ) {
			$dbMessage = OrdersService::RecordHistory($ticket);
		}
		
		return $dbMessage;
	}
	
	private static function RecordHistory(EditTicketObject $ticket):DbMessageObject {
		$historyOrder = $ticket->orgObject;
		$dbMessage = OrdersService::InsertOrder($historyOrder, OrdersService::TABLE_NAME_HISTORY_ORDERS);
		
		if($dbMessage->code === DbMessageObject::CODE_OK) {
			$dbMessage = OrdersService::InsertOrderRows($historyOrder, $historyOrder->id, OrdersService::TABLE_NAME_HISTORY_ORDER_ROWS);
		}
		return $dbMessage;
	}
			
	public static function UpdateOrderStatus(UpdateTicketObject $ticket):DbMessageObject {
		$order = $ticket->target;
		$newStatus = $ticket->data;
	
		$dbMessage = DataService::UpdateData( "UPDATE `orders`
				SET `status`='{$newStatus->code}'
				WHERE `id`='{$order->id}' " );
	
		return $dbMessage;
	}
	
	public static function UpdateOrderRowStatus(UpdateTicketObject $ticket):DbMessageObject {
		$orderRow = $ticket->target;
		$newStatus = $ticket->data;
	
		$dbMessage = DataService::UpdateData( "UPDATE `order_rows`
				SET `status`='{$newStatus->code}'
				WHERE `order_id`='{$orderRow->orderId}' AND `row_num`='{$orderRow->rowNumber}' " );
	
		return $dbMessage;
	}
	
	public static function UpdateOrderNote(UpdateTicketObject $ticket):DbMessageObject {
	    $order = $ticket->target;
	    $newNote = $ticket->data;
	    
	    $dbMessage = DataService::UpdateData( "UPDATE `orders`
				SET `notes`='{$newNote->note}' , `is_notes_resolved`='{$newNote->isResolved}'
				WHERE `id`='{$order->id}' " );
	    
	    return $dbMessage;
	}
	
	public static function UpdateOrderRowNote(UpdateTicketObject $ticket):DbMessageObject {
	    $orderRow = $ticket->target;
	    $newNote = $ticket->data;
	    
	    $dbMessage = DataService::UpdateData( "UPDATE `order_rows`
				SET `notes`='{$newNote->note}' , `is_notes_resolved`='{$newNote->isResolved}'
				WHERE `order_id`='{$orderRow->orderId}' AND `row_num`='{$orderRow->rowNumber}' " );
	    
	    return $dbMessage;
	}
	
	public static function Deserialize(string $baseData):OrderObject {
	    $orderStr = base64_decode($baseData);
	    $orderDTO = json_decode($orderStr);
	    return OrdersService::FromDTO($orderDTO);
	}
	
	public static function FromDTO($dto):OrderObject {
	    $customer = CustomersService::FromDTO($dto->customer);
	    $notes = new OrderNoteObject($dto->notes->note, $dto->notes->isResolved);
	    
	    return new OrderObject($dto->id, $dto->version, $customer, $dto->orderDate, $dto->supplyDate, 
	        $notes, $dto->orderRows, $dto->status);
	}
}

?>

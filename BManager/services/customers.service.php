<?php

require_once __DIR__ . '/../interfaces/network.service.interface.php';
require_once __DIR__ . '/../objects/customer.object.php';
require_once __DIR__ . '/../objects/customer.filter.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/data.service.php';

class CustomersService implements NetworkServiceInterface {
    
    const TABLE_NAME_CUSTOMERS = "`customers`";

    public static function GetCustomers(CustomerFilterObject $filter):DbMessageObject {
	    $tableName = CustomersService::TABLE_NAME_CUSTOMERS;
	    $queryCondition = $filter->toSqlString($tableName);
	    
		$dbMessage = DataService::SelectData("SELECT * 
                        FROM {$tableName} 
                        WHERE {$queryCondition}");

		$queryData = $dbMessage->data;
		$data = array();
		while( $row = $queryData->fetch_object() ) {
		    $customer = new CustomerObject($row->id, $row->name, $row->phone, $row->is_deleted);
		    $data[] = $customer;
		}
		$dbMessage->data = $data;
		return $dbMessage;
	}

	public static function AddCustomer(CustomerObject $customer):DbMessageObject {
	    $tableName = CustomersService::TABLE_NAME_CUSTOMERS;
		$dbMessage = DataService::InsertData( "INSERT INTO {$tableName} (`id` , `name` , `phone`)
				VALUES( '{$customer->id}' , '{$customer->name}' , '{$customer->phone}')" );

		return $dbMessage;
	}
	
	public static function DeleteCustomer(CustomerObject $customer):DbMessageObject {
	    $tableName = CustomersService::TABLE_NAME_CUSTOMERS;
	    $dbMessage = DataService::UpdateData( "UPDATE {$tableName}
				SET `is_deleted`='1'
				WHERE `id`='{$customer->id}' " );
	    
	    return $dbMessage;
	}
	
	public static function EditCustomer(EditTicketObject $ticket):DbMessageObject {
	    $tableName = CustomersService::TABLE_NAME_CUSTOMERS;
		$orgCustomer = $ticket->orgObject;
		$edtCustomer = $ticket->edtObject;
	
		$dbMessage = DataService::UpdateData( "UPDATE {$tableName}
				SET `id`='{$edtCustomer->id}' , `name`='{$edtCustomer->name}' , `phone`='{$edtCustomer->phone}'
				WHERE `id`='{$orgCustomer->id}' " );
	
		return $dbMessage;
	}
	
	public static function Deserialize(string $baseData):CustomerObject {
	    $customerStr = base64_decode($baseData);
	    $customerDTO = json_decode($customerStr);
	    return CustomersService::FromDTO($customerDTO);
	}
	
	public static function FromDTO($dto):CustomerObject {
	    return new CustomerObject($dto->id, $dto->name, $dto->phone, $dto->isDeleted);
	}
}
?>
<?php

require_once __DIR__ . '/../constants/types.constants.php';
require_once __DIR__ . '/../interfaces/network.service.interface.php';
require_once __DIR__ . '/../objects/user.access.object.php';
require_once __DIR__ . '/../objects/user.object.php';
require_once __DIR__ . '/../objects/user.filter.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/data.service.php';

class UsersService implements NetworkServiceInterface {
    
    const TABLE_NAME_USERS = "`users`";
    const TABLE_NAME_USERS_ACCESS = "`users_access`";
    
    public static function AddUser(UserObject $user):DbMessageObject {
        $tableName = UsersService::TABLE_NAME_USERS;
        $user->password = md5($user->password);
        
        $dbMessage = DataService::InsertData( "INSERT INTO {$tableName} (`id` , `name` , `password` , `is_deleted`)
				VALUES( '{$user->id}' , '{$user->username}' , '{$user->password}' , '{$user->isDeleted}')" );
        
        if($dbMessage->code === DbMessageObject::CODE_OK) {
            $userId = $dbMessage->data; //auto generated
            $dbMessage = UsersService::AddUserAccess($userId, $user->userAccess);
            $dbMessage->data = $userId; //Restore the user id for client use.
        }
        
        return $dbMessage;
    }
    
    private static function AddUserAccess(int $userId, UserAccessObject $userAccess):DbMessageObject {
        $tableName = UsersService::TABLE_NAME_USERS_ACCESS;
        $dbMessage = DataService::InsertData( "INSERT INTO {$tableName} (`user_id` , `access_home` , `access_products` , `access_customers` , `access_orders` , 
                `access_monitor` , `access_deliveries` , `access_reports` , `access_system`)
				VALUES( '{$userId}' , '{$userAccess->accessHome}' , '{$userAccess->accessProducts}' , '{$userAccess->accessCustomers}' , 
                '{$userAccess->accessOrders}' , '{$userAccess->accessMonitor}' , '{$userAccess->accessDeliveries}' , 
                '{$userAccess->accessReports}' , '{$userAccess->accessSystem}')" );
        
        return $dbMessage;
    }
    
    public static function GetUsers(UserFilterObject $filter):DbMessageObject {
        $tableName = UsersService::TABLE_NAME_USERS;
        $tableNameAccess = UsersService::TABLE_NAME_USERS_ACCESS;
        $queryCondition = $filter->toSqlString($tableName);
        
        $dbMessage = DataService::SelectData("SELECT {$tableName}.`id` , {$tableName}.`name` , {$tableName}.`is_deleted` , 
                        {$tableNameAccess}.*
                        FROM {$tableName} 
                        LEFT JOIN {$tableNameAccess} 
                        ON {$tableName}.`id`={$tableNameAccess}.`user_id` 
                        WHERE {$queryCondition}
                        ORDER BY {$tableName}.`id` ASC");
        
        $queryData = $dbMessage->data;
        $data = array();
        while( $row = $queryData->fetch_object() ) {
            $userAccess = new UserAccessObject($row->access_home, $row->access_products, $row->access_customers, 
                $row->access_orders, $row->access_monitor, $row->access_deliveries, $row->access_reports, $row->access_system);
            $user = new UserObject($row->id, $row->name, '', $userAccess, $row->is_deleted);
            $data[] = $user;
        }
        $dbMessage->data = $data;
        return $dbMessage;
    }
    
    public static function GetUser(UserFilterObject $filter):DbMessageObject {
        $tableName = UsersService::TABLE_NAME_USERS;
        $tableNameAccess = UsersService::TABLE_NAME_USERS_ACCESS;
        $queryCondition = $filter->toSqlString($tableName);
        
        $dbMessage = DataService::SelectData("SELECT {$tableName}.`id` , {$tableName}.`name` , {$tableName}.`is_deleted` , 
                                              {$tableNameAccess}.*
                                              FROM {$tableName}
                                              LEFT JOIN {$tableNameAccess} 
                                              ON {$tableName}.`id`={$tableNameAccess}.`user_id` 
                                              WHERE {$queryCondition}
                                              LIMIT 1");
        
        $queryData = $dbMessage->data;
        $data = null;
        if( $row = $queryData->fetch_object() ) {
            $userAccess = new UserAccessObject($row->access_home, $row->access_products, $row->access_customers,
                $row->access_orders, $row->access_monitor, $row->access_deliveries, $row->access_reports, $row->access_system);
            $user = new UserObject($row->id, $row->name, '', $userAccess, $row->is_deleted);
            $data = $user;
        }
        $dbMessage->data = $data;
        return $dbMessage;
    }
    
    public static function EditUser(EditTicketObject $ticket):DbMessageObject {
        $tableName = UsersService::TABLE_NAME_USERS;
        
        /* @var $orgUser UserObject */
        $orgUser = $ticket->orgObject;
        
        /* @var $edtUser UserObject */
        $edtUser = $ticket->edtObject;
        
        $password = '';
        if( isset($edtUser->password) && !empty($edtUser->password) ) {
            $password = md5($edtUser->password);
        }
        
        
        $dbMessage = DataService::UpdateData( "UPDATE {$tableName}
				SET `id`='{$edtUser->id}' , `name`='{$edtUser->username}' , `password` = IF( '{$password}' != '' , '{$password}' , `password`) , 
                `is_deleted`='{$edtUser->isDeleted}'
				WHERE `id`='{$orgUser->id}' " );
        
        if($dbMessage->code === DbMessageObject::CODE_OK) {
            $dbMessage = UsersService::EditUserAccess($orgUser->id, $orgUser->userAccess, $edtUser->userAccess);
        }
        
        return $dbMessage;
    }
    
    private static function EditUserAccess(int $userId, UserAccessObject $orgAccess, UserAccessObject $edtAccess):DbMessageObject {
        $tableName = UsersService::TABLE_NAME_USERS_ACCESS;
        $dbMessage = DataService::UpdateData( "UPDATE {$tableName}
				SET `access_home`='{$edtAccess->accessHome}' , `access_products`='{$edtAccess->accessProducts}' , `access_customers`='{$edtAccess->accessCustomers}' , 
                `access_orders`='{$edtAccess->accessOrders}' , `access_monitor`='{$edtAccess->accessMonitor}' , `access_deliveries`='{$edtAccess->accessDeliveries}' , 
                `access_reports`='{$edtAccess->accessReports}' , `access_system`='{$edtAccess->accessSystem}'
				WHERE `user_id`='{$userId}' " );
        
        return $dbMessage;
    }
    
    public static function DeleteUser(UserObject $user):DbMessageObject {
        $tableName = UsersService::TABLE_NAME_USERS;
        $dbMessage = DataService::UpdateData( "UPDATE {$tableName}
				SET `is_deleted`='1'
				WHERE `id`='{$user->id}' " );
        
        return $dbMessage;
    }
    
    public static function Deserialize(string $baseData):UserObject {
        $userStr = base64_decode($baseData);
        $userDTO = json_decode($userStr);
        return UsersService::FromDTO($userDTO);
    }
    
    public static function FromDTO($dto):UserObject {
        $userAccess = UserAccessObject::FromDTO($dto->userAccess, TypesConstants::USER_ACCESS);
        return new UserObject($dto->id, $dto->username, $dto->password, $userAccess, $dto->isDeleted);
    }
    
}

?>
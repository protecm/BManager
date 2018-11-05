<?php

require_once __DIR__ . '/../interfaces/network.service.interface.php';
require_once __DIR__ . '/../objects/category.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/data.service.php';

class CategoriesService implements NetworkServiceInterface {
    
    const TABLE_NAME_CATEGORIES = "`categories`";
	
	public static function GetCategories():DbMessageObject {
	    $tableName = CategoriesService::TABLE_NAME_CATEGORIES;
		$dbMessage = DataService::SelectData("SELECT * FROM {$tableName} 
                WHERE `is_deleted`='0'");
		
		$queryData = $dbMessage->data;
		$data = array();
		while( $row = $queryData->fetch_object() ) {
		    $category = new CategoryObject($row->id, $row->name, $row->is_deleted);
		    $data[] = $category;
		}
		$dbMessage->data = $data;
		return $dbMessage;
	}
	
	public static function AddCategory(CategoryObject $category):DbMessageObject {
	    $tableName = CategoriesService::TABLE_NAME_CATEGORIES;
		$dbMessage = DataService::InsertData( "INSERT INTO {$tableName} (`id` , `name` , `is_deleted` ) 
											VALUES( '{$category->id}' , '{$category->name}' , '{$category->isDeleted}')" );
		
		return $dbMessage;
	}
	
	public static function DeleteCategory(CategoryObject $category):DbMessageObject {
	    $tableName = CategoriesService::TABLE_NAME_CATEGORIES;
	    $dbMessage = DataService::UpdateData( "UPDATE {$tableName}
				SET `is_deleted`='1'
				WHERE `id`='{$category->id}' " );
	    
	    return $dbMessage;
	}
	
	public static function EditCategory(EditTicketObject $ticket):DbMessageObject {
	    $tableName = CategoriesService::TABLE_NAME_CATEGORIES;
		$orgCategory = $ticket->orgObject;
		$edtCategory = $ticket->edtObject;
	
		$dbMessage = DataService::UpdateData( "UPDATE {$tableName}
				SET `id`='{$edtCategory->id}' , `name`='{$edtCategory->name}' , `is_deleted`='{$edtCategory->isDeleted}'
				WHERE `id`='{$orgCategory->id}' " );
	
		return $dbMessage;
	}
	
	public static function Deserialize(string $baseData):CategoryObject {
	    $categoryStr = base64_decode($baseData);
	    $categoryDTO = json_decode($categoryStr);
	    return CategoriesService::FromDTO($categoryDTO);
	}
	
	public static function FromDTO($dto):CategoryObject {
	    return new CategoryObject($dto->id, $dto->name, $dto->isDeleted);
	}
}
?>
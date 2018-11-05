<?php

require_once __DIR__ . '/../interfaces/network.service.interface.php';
require_once __DIR__ . '/../objects/category.object.php';
require_once __DIR__ . '/../objects/product.object.php';
require_once __DIR__ . '/../objects/product.filter.object.php';
require_once __DIR__ . '/../objects/db.message.object.php';
require_once __DIR__ . '/../services/categories.service.php';
require_once __DIR__ . '/../services/data.service.php';

class ProductsService implements NetworkServiceInterface {

    const TABLE_NAME_PRODUCTS = "`products`";
    
	public static function GetProducts(ProductFilterObject $filter):DbMessageObject {
	    $tableName = ProductsService::TABLE_NAME_PRODUCTS;
	    $tableNameCategories = CategoriesService::TABLE_NAME_CATEGORIES;
	    $queryCondition = $filter->toSqlString($tableName);
	    
		$dbMessage = DataService::SelectData("SELECT {$tableName}.* , {$tableNameCategories}.`name` AS 'category_name',
                {$tableNameCategories}.`is_deleted` AS 'category_is_deleted' 
				FROM {$tableName} 
				LEFT JOIN {$tableNameCategories} 
				ON {$tableName}.`category_id`={$tableNameCategories}.`id`
                WHERE {$queryCondition}
				ORDER BY {$tableName}.`id` ASC");

		$queryData = $dbMessage->data;
		$data = array();
		while( $row = $queryData->fetch_object() ) {
		    $category = new CategoryObject($row->category_id, $row->category_name, $row->category_is_deleted);
			$product = new ProductObject($row->id, $category, $row->name, $row->is_deleted);
			$data[] = $product;
		}
		$dbMessage->data = $data;
		return $dbMessage;
	}

	public static function AddProduct(ProductObject $product):DbMessageObject {
	    $tableName = ProductsService::TABLE_NAME_PRODUCTS;
		$dbMessage = DataService::InsertData( "INSERT INTO {$tableName} (`id` , `category_id` , `name`)
				VALUES( '{$product->id}' , '{$product->category->id}' , '{$product->name}')" );

		return $dbMessage;
	}
	
	public static function DeleteProduct(ProductObject $product):DbMessageObject {
	    $tableName = ProductsService::TABLE_NAME_PRODUCTS;
	    $dbMessage = DataService::UpdateData( "UPDATE {$tableName}
				SET `is_deleted`='1'
				WHERE `id`='{$product->id}' " );
	    
	    return $dbMessage;
	}
	
	public static function EditProduct(EditTicketObject $ticket):DbMessageObject {
	    $tableName = ProductsService::TABLE_NAME_PRODUCTS;
		$orgProduct = $ticket->orgObject;
		$edtProduct = $ticket->edtObject;
		
		$dbMessage = DataService::UpdateData( "UPDATE {$tableName} 
				SET `id`='{$edtProduct->id}' , `category_id`='{$edtProduct->category->id}' , `name`='{$edtProduct->name}' 
				WHERE `id`='{$orgProduct->id}' " );
	
		return $dbMessage;
	}
	
	public static function Deserialize(string $baseData):ProductObject {	    
	    $productStr = base64_decode($baseData);
	    $productDTO = json_decode($productStr);
	    return ProductsService::FromDTO($productDTO);
	}
	
	public static function FromDTO($dto):ProductObject {
	    $category = CategoriesService::FromDTO($dto->category);
	    return new ProductObject($dto->id, $category, $dto->name, $dto->isDeleted);
	}
}

?>
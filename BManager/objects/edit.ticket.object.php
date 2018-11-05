<?php

require_once __DIR__ . '/../interfaces/network.object.interface.php';
require_once __DIR__ . '/../constants/types.constants.php';
require_once __DIR__ . '/../services/categories.service.php';
require_once __DIR__ . '/../services/customers.service.php';
require_once __DIR__ . '/../services/orders.service.php';
require_once __DIR__ . '/../services/products.service.php';
require_once __DIR__ . '/../services/users.service.php';
require_once __DIR__ . '/../services/configuration.service.php';

class EditTicketObject implements NetworkObjectInterface {
    
    public $orgObject;
    public $edtObject;
    public $recordHistory;

    function __construct($editTicketDTO, int $type) {
        $this->constructFromGeneralDTO($editTicketDTO, $type);
	}
        
	private function constructFromGeneralDTO($editTicketDTO, int $type) {
	    switch ($type) {
	        case (TypesConstants::CATEGORY):
	            $this->constructFromTypesDTO($editTicketDTO, CategoriesService::class);
	            break;
	        case (TypesConstants::CUSTOMER):
	            $this->constructFromTypesDTO($editTicketDTO, CustomersService::class);
	            break;
	        case (TypesConstants::ORDER):
	            $this->constructFromTypesDTO($editTicketDTO, OrdersService::class);
	            break;
	        case (TypesConstants::PRODUCT):
	            $this->constructFromTypesDTO($editTicketDTO, ProductsService::class);
	            break;
	        case (TypesConstants::CONFIGURATION):
	            $this->constructFromTypesDTO($editTicketDTO, ConfigurationService::class);
	            break;
	        case (TypesConstants::USER):
	            $this->constructFromTypesDTO($editTicketDTO, UsersService::class);
	            break;
            default:
                $this->constructFromUnknownType($editTicketDTO);
                break;
	    }
	}
	
	private function constructFromTypesDTO($editTicketDTO, $networkService) {
	    $this->orgObject = $networkService::FromDTO($editTicketDTO->orgObject);
	    $this->edtObject = $networkService::FromDTO($editTicketDTO->edtObject);
	    $this->recordHistory = $editTicketDTO->recordHistory;
	}
	
	private function constructFromUnknownType($editTicketDTO) {
	    $this->orgObject = $editTicketDTO->orgObject;
	    $this->edtObject = $editTicketDTO->edtObject;
	    $this->recordHistory = $editTicketDTO->recordHistory;
	}
	
	public function serialize():string {
	    $data = new stdclass();
	    return json_encode($data);
	}
	
	public static function FromBase($baseData, int $type):EditTicketObject {
	    $ticketStr = base64_decode($baseData);
	    $ticketDTO = json_decode($ticketStr);
	    
	    return EditTicketObject::FromDTO($ticketDTO, $type);
	}
	
	public static function FromDTO($dto, int $type):EditTicketObject {
	    return new EditTicketObject($dto, $type);
	}
}

?>

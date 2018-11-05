<?php

require_once __DIR__ . '/../interfaces/network.object.interface.php';
require_once __DIR__ . '/../services/orders.service.php';
require_once __DIR__ . '/../services/order.rows.service.php';

class UpdateTicketObject implements NetworkObjectInterface {
    public $target;
    public $data;
    
    function __construct($ticketDTO, int $type) {
        //TODO - Need to extend functionality to get 2 types (target & data), status object, note object...
        //currently only target type is passed
        $this->constructFromGeneralDTO($ticketDTO, $type);
    }
    
    private function constructFromGeneralDTO($ticketDTO, int $type) {
        switch ($type) {
            case (TypesConstants::ORDER):
                $this->constructFromTypesDTO($ticketDTO, OrdersService::class);
                break;
            case (TypesConstants::ORDER_ROW):
                $this->constructFromTypesDTO($ticketDTO, OrderRowsService::class);
                break;
            default:
                $this->constructFromUnknownType($ticketDTO);
                break;
        }
    }
    
    private function constructFromTypesDTO($ticketDTO, $networkService) {
        $this->target = $networkService::FromDTO($ticketDTO->target);
        $this->data = $ticketDTO->data;
    }
    
    private function constructFromUnknownType($ticketDTO) {
        $this->target = $ticketDTO->target;
        $this->data = $ticketDTO->data;
    }
    
    public function serialize():string {
        $data = new stdclass();
        return json_encode($data);
    }
    
    public static function FromBase($baseData, int $type):UpdateTicketObject {
        $ticketStr = base64_decode($baseData);
        $ticketDTO = json_decode($ticketStr);
        
        return UpdateTicketObject::FromDTO($ticketDTO, $type);
    }
    
    public static function FromDTO($dto, int $type):UpdateTicketObject {
        return new UpdateTicketObject($dto, $type);
    }
}
?>
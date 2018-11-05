<?php

require_once __DIR__ . '/../interfaces/network.object.interface.php';

class UserAccessObject implements NetworkObjectInterface {
    
    public $accessHome;
    public $accessProducts;
    public $accessCustomers;
    public $accessOrders;
    public $accessMonitor;
    public $accessDeliveries;
    public $accessReports;
    public $accessSystem;
    
    function __construct(int $accessHome, int $accessProducts, int $accessCustomers, int $accessOrders, 
        int $accessMonitor, int $accessDeliveries, int $accessReports, int $accessSystem) {
        $this->accessHome = $accessHome;
        $this->accessProducts = $accessProducts;
        $this->accessCustomers = $accessCustomers;
        $this->accessOrders = $accessOrders;
        $this->accessMonitor = $accessMonitor;
        $this->accessDeliveries = $accessDeliveries;
        $this->accessReports = $accessReports;
        $this->accessSystem = $accessSystem;
    }
    
    public function serialize():string {
        $data = new stdclass();
        return json_encode($data);
    }
    
    public static function FromBase($baseData, int $type):UserAccessObject {
        $userAccessStr = base64_decode($baseData);
        $userAccessDTO = json_decode($userAccessStr);
        
        return UserAccessObject::FromDTO($userAccessDTO, $type);
    }
    
    public static function FromDTO($dto, int $type):UserAccessObject {
        return new UserAccessObject($dto->accessHome, $dto->accessProducts, $dto->accessCustomers, $dto->accessOrders, 
            $dto->accessMonitor, $dto->accessDeliveries, $dto->accessReports, $dto->accessSystem);
    }
}

?>




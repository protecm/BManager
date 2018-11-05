<?php

require_once __DIR__ . '/../interfaces/network.service.interface.php';
require_once __DIR__ . '/../objects/order.note.object.php';
require_once __DIR__ . '/../objects/order.row.object.php';
require_once __DIR__ . '/../services/products.service.php';

class OrderRowsService implements NetworkServiceInterface {
    
    public static function Deserialize(string $baseData):OrderRowObject {
        $orderRowStr = base64_decode($baseData);
        $orderRowDTO = json_decode($orderRowStr);
        return OrderRowsService::FromDTO($orderRowDTO);
    }
    
    public static function FromDTO($dto):OrderRowObject {
        $product = ProductsService::FromDTO($dto->product);
        $note = new OrderNoteObject($dto->notes->note, $dto->notes->isResolved);
        
        return new OrderRowObject($dto->orderId, $dto->orderVersion, $dto->rowNumber, $product, $dto->amount, 
            $note, $dto->status);
    }
}

?>
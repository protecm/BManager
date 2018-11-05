import {OrderService} from "./order.service";
import {OrderObject} from "../objects/order/order.object";
import {OrderFilterObject} from "../objects/order/order.filter.object";
import {CachedServiceInterface} from "../interfaces/cached.service.interface";
import {CallbackService} from "../interfaces/callback.service.interface";
import {IIntervalService} from "angular";

interface CachedDeliveriesService {
    deliveryOrdersCount:number;
}

export class DeliveriesService extends CallbackService implements CachedServiceInterface<CachedDeliveriesService> {

    /*  CACHED-DATA  */
    public timestamp:number;
    public cacheData:CachedDeliveriesService = <any>{};

    constructor(private orderService:OrderService,
                $interval:IIntervalService){
        super($interval);
    }

    public getOrders():Promise<OrderObject[]> {
        return this.orderService.getOrders(OrderFilterObject.GetOrdersForDeliveryFilter())
            .then((orders:OrderObject[]) => {
                this.timestamp = Date.now();
                this.cacheData.deliveryOrdersCount = orders ? orders.length:0;
                return orders;
            });
    }
}
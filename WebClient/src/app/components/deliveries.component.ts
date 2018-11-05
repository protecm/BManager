import {IComponentController, IComponentOptions} from "angular";
import {DeliveriesService} from "../services/deliveries.service";
import {OrderObject} from "../objects/order/order.object";
import {OrderConstants} from "../constants/order.constants";
import {ModalService} from "../services/modal.service";
import {MonitorService} from "../services/monitor.service";
import {orderViewModalComponent} from "./modals/order/order.view.modal.component";
import {ConfigurationService} from "../services/configuration.service";
import {BusyHelper, CgBusyInterface} from "../helpers/busy.helper";

class DeliveriesComponent implements IComponentController{

    public sortProperty:string;
    public orders:OrderObject[];
    public isGettingOrdersFromServer:boolean;
    public cgBusyOrders:CgBusyInterface;
    private listenerID:number;

    public isPackingInProgress = {};
    public isReadyOrderInProgress = {};
    public isSupplyInProgress = {};

    constructor(private deliveriesService:DeliveriesService,
                private monitorService:MonitorService,
                private modalService:ModalService,
                private confService:ConfigurationService){
        this.cgBusyOrders = BusyHelper.GetDefaultBusy('LOADING_ORDERS');
        this.sortProperty = '+supplyDate';
        this.getOrdersFromServer();
    }

    private getOrdersFromServer():void {
        if(!this.isGettingOrdersFromServer) {
            this.isGettingOrdersFromServer = true;

            this.cgBusyOrders.promise = this.deliveriesService.getOrders()
                .then( (data:OrderObject[]) => {
                    this.isGettingOrdersFromServer = false;
                    this.orders = data;
                });
        }
    }

    public showOrder(order:OrderObject):void {
        //  TODO - create orderViewModalComponent
        let options = new orderViewModalComponent(order);
        this.modalService.showModal<void>(options)
            .then( () => {
                // modal closed
            },(error) => {
                //handle error/dismiss
            });
    }

    public packOrder(order:OrderObject):void {
        if(order) {
            //Update server
            this.isPackingInProgress[order.id] = true;
            this.monitorService.updateOrderStatus(order,OrderConstants.STATUS_PACKING)
                .then( (result:boolean) => {
                    this.isPackingInProgress[order.id] = false;
                    if(result) {
                        //Update Client
                        order.status = OrderConstants.STATUS_PACKING;
                    }
                });
        }
    }

    public readyOrder(order:OrderObject):void {
        if(order) {
            //Update server
            this.isReadyOrderInProgress[order.id] = true;
            this.monitorService.updateOrderStatus(order,OrderConstants.STATUS_PACKED)
                .then( (result:boolean) => {
                    this.isReadyOrderInProgress[order.id] = false;
                    if(result) {
                        //Update Client
                        order.status = OrderConstants.STATUS_PACKED;
                    }
                });
        }
    }

    public supplyOrder(order:OrderObject):void {
        if(order) {
            //Update server
            this.isSupplyInProgress[order.id] = true;
            this.monitorService.updateOrderStatus(order,OrderConstants.STATUS_SUPPLIED)
                .then( (result:boolean) => {
                    this.isSupplyInProgress[order.id] = false;
                    if(result) {
                        //Update Client
                        order.status = OrderConstants.STATUS_SUPPLIED;
                    }
                });
        }
    }

    public $onInit():void {
        this.listenerID = this.deliveriesService.getUnusedID();
        if(this.listenerID) {
            this.deliveriesService.registerTickListener(this.listenerID, () => {
                this.getOrdersFromServer();
            },this.confService.configurationData.deliveriesRefreshRateMinutes*60000);
        }
    }

    public $onDestroy():void {
        this.deliveriesService.stopTickListener(this.listenerID);
    }
}

export var deliveriesComponent:IComponentOptions = {
    controller: DeliveriesComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/deliveries.template.html'
};
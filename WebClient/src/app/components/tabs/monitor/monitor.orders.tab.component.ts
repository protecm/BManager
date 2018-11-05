import {IAngularStatic, IComponentController, IComponentOptions} from "angular";
import {OrderObject} from "../../../objects/order/order.object";
import {OrderConstants, OrderStatus} from "../../../constants/order.constants";
import {MonitorService} from "../../../services/monitor.service";
import {MonitorBaseTabComponent} from "./monitor.base.tab.component";
import {ModalService} from "../../../services/modal.service";
import {orderApproveUpdatedModalComponent} from "../../modals/order/order.approve.updated.modal.component";
import {ConfigurationService} from "../../../services/configuration.service";
import {OrderNoteObject} from "../../../objects/order/order.note.object";
import {OrderRowObject} from "../../../objects/order/order.row.object";

declare const angular:IAngularStatic;
class MonitorOrdersTabComponent extends MonitorBaseTabComponent implements IComponentController{
    public vm:MonitorOrdersTabComponent;

    public isCollapsed = {};
    public isApproveInProgress = {};
    public isMoveOrderToDeliveriesInProgress = {};
    public orders:OrderObject[];
    constructor(private modalService:ModalService,
                private confService:ConfigurationService,
                monitorService:MonitorService){
        super(monitorService);
        this.sortProperty = '+supplyDate';
        this.getActiveOrdersFromServer();
    }

    private getActiveOrdersFromServer():void {
        if(!this.isGettingOrdersFromServer) {
            this.isGettingOrdersFromServer = true;

            this.cgBusyOrders.promise = this.monitorService.getActiveOrders()
                .then( (data:OrderObject[]) => {
                    this.isGettingOrdersFromServer = false;
                    this.orders = data;
                });
        }
    }

    public get isNotesEnforced():boolean {
        return this.confService.configurationData.commentsEnforcement;
    }

    public resolveOrderNotes(order:OrderObject):Promise<boolean> {
        const newNote = new OrderNoteObject(order.notes.note,true);
        return this.monitorService.updateOrderNote(order,newNote)
            .then( (result:boolean) => {
                if(result) {
                    order.notes.isResolved = true;
                }
                return result;
            });
    }

    public resolveOrderRowNotes(orderRow:OrderRowObject):Promise<boolean> {
        const newNote = new OrderNoteObject(orderRow.notes.note,true);
        return this.monitorService.updateOrderRowNote(orderRow,newNote)
            .then( (result:boolean) => {
                if(result) {
                    orderRow.notes.isResolved = true;
                }
                return result;
            });
    }

    public approveOrder(order:OrderObject):void {
        if(order) {
            if(order.isUpdated) {
                this.approveUpdatedOrder(order);
            }else {
                //Update server
                this.isApproveInProgress[order.id] = true;
                this.monitorService.updateOrderStatus(order,OrderConstants.STATUS_APPROVED)
                    .then( (result:boolean) => {
                        this.isApproveInProgress[order.id] = false;
                        if(result) {
                            //Update Client
                            order.status = OrderConstants.STATUS_APPROVED;
                        }
                    });
            }
        }//Big If
    }

    private approveUpdatedOrder(order):void {
        this.isApproveInProgress[order.id] = true;
        const historyOrderPromise = this.monitorService.getPreviousOrderVersion(order);

        historyOrderPromise
            .then( (historyOrder:OrderObject) => {
                this.isApproveInProgress[order.id] = false;
                    if(historyOrder) {
                        let options = new orderApproveUpdatedModalComponent(order,historyOrder);
                        this.modalService.showModal<OrderStatus>(options)
                            .then( (result:OrderStatus) => {
                                if(result) {
                                    //Update Client
                                    order.status = result;
                                }
                            },(error) => {
                                //handle error/dismiss
                            });
                    }else {
                        //handle error - problem with history order
                    }
                });
    }

    public moveOrderToDeliveries(order:OrderObject):void {
        if( order && order.isReady ) {
            //Update server
            this.isMoveOrderToDeliveriesInProgress[order.id] = true;
            this.monitorService.updateOrderStatus(order,OrderConstants.STATUS_DELIVERIES)
                .then( (result:boolean) => {
                    this.isMoveOrderToDeliveriesInProgress[order.id] = false;
                    if(result) {
                        //Update Client
                        order.status = OrderConstants.STATUS_DELIVERIES;
                    }
                });
        }
    }

    public toggleColapse(orderId:number) {
        this.isCollapsed[orderId] = !this.isCollapsed[orderId];
    }

    public $onInit():void {
        this.monitorService.registerTickListener(this.tabIndex, () => {
            this.getActiveOrdersFromServer();
        },this.confService.configurationData.monitorRefreshRateMinutes*60000);
    }

    public $onDestroy():void {
        this.monitorService.stopTickListener(this.tabIndex);
    }
}

export var monitorOrdersTabComponent:IComponentOptions = {
    controller: MonitorOrdersTabComponent,
    controllerAs: 'vm',
    bindings: {
        tabIndex: '<'
    },
    templateUrl: 'app/templates/tabs/monitor.orders.tab.template.html'
};
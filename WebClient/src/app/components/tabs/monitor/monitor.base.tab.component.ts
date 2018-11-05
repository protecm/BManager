import {MonitorService} from "../../../services/monitor.service";
import {OrderRowObject} from "../../../objects/order/order.row.object";
import {OrderObject} from "../../../objects/order/order.object";
import {OrderConstants} from "../../../constants/order.constants";
import {BusyHelper, CgBusyInterface} from "../../../helpers/busy.helper";
import {TabComponentInterface} from "../../../interfaces/tab.manager.interface";
import {BaseTableActionInterface} from "../../tables/base.table.component";
import {MonitorOrderRowObject} from "../../../objects/monitor/monitor.order.row.object";

export abstract class MonitorBaseTabComponent implements TabComponentInterface{

    public tabIndex:number;
    public sortProperty:string;
    public isInitRowInProgress = {};
    public isStartRowInProgress = {};
    public isReadyRowInProgress = {};
    public isQuickBtnOpen = {};
    protected isGettingOrdersFromServer:boolean;
    public cgBusyOrders:CgBusyInterface;

    constructor(protected monitorService:MonitorService){
        this.cgBusyOrders = BusyHelper.GetDefaultBusy('LOADING_ORDERS');
    }

    public quickActionOnRow(orderRow:OrderRowObject, order:OrderObject, newStatusDesc:string):void {
        switch (newStatusDesc) {
            case OrderConstants.STATUS_NEW.description:
                this.initRow(orderRow, order);
                break;
            case OrderConstants.STATUS_IN_PROGRESS.description:
                this.startRow(orderRow, order);
                break;
            case OrderConstants.STATUS_READY.description:
                this.readyRow(orderRow, order);
            default:
                //handle unknown action
                break;
        }
    }

    public initRow(orderRow:OrderRowObject, order:OrderObject):void {
        //TODO - view the changes of start & ready actions... bellow
        if(orderRow && order) {
            //Update server
            this.isInitRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = true;
            this.monitorService.updateOrderRowStatus(orderRow,OrderConstants.STATUS_NEW)
                .then( (result:boolean) => {
                    this.isInitRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = false;
                    if(result) {
                        //Update Client
                        orderRow.status = OrderConstants.STATUS_NEW;
                    }
                });
            //Update order status, handle case when order is ready and you return a row to NEW state
            if(order.status === OrderConstants.STATUS_READY) {
                //Update server
                this.monitorService.updateOrderStatus(order,OrderConstants.STATUS_IN_PROGRESS)
                    .then( (result:boolean) => {
                        if(result) {
                            //Update Client
                            order.status = OrderConstants.STATUS_IN_PROGRESS;
                        }
                    });
            }
        }
    }

    public startRow(orderRow:OrderRowObject, order:OrderObject):void {
        const monitorOrderRow = new MonitorOrderRowObject(order,orderRow);
        this.isStartRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = true;
        this.onRowStart(monitorOrderRow)
            .then( () => {
                this.isStartRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = false;
            });
    }

    public readyRow(orderRow:OrderRowObject, order:OrderObject):void {
        const monitorOrderRow = new MonitorOrderRowObject(order,orderRow);
        this.isReadyRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = true;
        this.onRowReady(monitorOrderRow)
            .then( () => {
                this.isReadyRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = false;
            });
    }

    public onRowStart:BaseTableActionInterface<MonitorOrderRowObject> =
        (monitorOrderRow:MonitorOrderRowObject):Promise<void> => {
            return this.monitorService.monitorOrderRowStart(monitorOrderRow);
        };

    public onRowReady:BaseTableActionInterface<MonitorOrderRowObject> =
        (monitorOrderRow:MonitorOrderRowObject):Promise<void> => {
            return this.monitorService.monitorOrderRowReady(monitorOrderRow);
        };
}
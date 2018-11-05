import {OrderService} from "./order.service";
import {OrderRowObject} from "../objects/order/order.row.object";
import {OrderObject} from "../objects/order/order.object";
import {OrderFilterObject} from "../objects/order/order.filter.object";
import {DateHelper} from "../helpers/date.helper";
import {ConfigurationService} from "./configuration.service";
import {OrderConstants, OrderStatus} from "../constants/order.constants";
import {DataBaseMessageInterface} from "../interfaces/server.message.interface";
import {DbMessagesConstants} from "../constants/db.messages.constants";
import {MonitorOrderRowObject} from "../objects/monitor/monitor.order.row.object";
import {CallbackService} from "../interfaces/callback.service.interface";
import {IIntervalService, IPromise} from "angular";
import {CachedServiceInterface} from "../interfaces/cached.service.interface";
import {OrderNoteObject} from "../objects/order/order.note.object";

interface CachedMonitorService {
    monitorOrdersCount:number;
}

export class MonitorService extends CallbackService implements CachedServiceInterface<CachedMonitorService>{

    /*  CACHED-DATA  */
    public timestamp:number;
    public cacheData:CachedMonitorService = <any>{};

    constructor(private orderService:OrderService,
                private confService:ConfigurationService,
                private $q:angular.IQService,
                $interval:IIntervalService){
        super($interval);
    }

    public getActiveMonitorOrdersRows():Promise<MonitorOrderRowObject[]> {
        return this.getActiveOrders()
            .then( (orders:OrderObject[]) => {
               return MonitorService.OrdersToMonitorRows(orders);
            });
    }

    public getActiveOrders():Promise<OrderObject[]> {
        const hoursInterval = this.confService.configurationData.monitorActiveOrderHours;
        const toDate = DateHelper.GetTodayDate(hoursInterval);
        return this.orderService.getOrders(OrderFilterObject.GetActiveOrdersFilter(toDate))
            .then((orders:OrderObject[]) => {
                this.timestamp = Date.now();
                this.cacheData.monitorOrdersCount = orders ? orders.length:0;
                return orders;
            });
    }

    public getPreviousOrderVersion(order:OrderObject):Promise<OrderObject> {
        return this.orderService.getPreviousOrderVersion(order);
    }

    public updateOrderStatus(order:OrderObject, newStatus:OrderStatus):Promise<boolean> {
        return this.orderService.updateOrderStatus(order,newStatus)
            .then( (dbMsg:DataBaseMessageInterface<any>) => {
                return dbMsg.code === DbMessagesConstants.CODE_OK;
            });
    }

    public updateOrderRowStatus(orderRow:OrderRowObject, newStatus:OrderStatus):Promise<boolean> {
        return this.orderService.updateOrderRowStatus(orderRow, newStatus)
            .then( (dbMsg:DataBaseMessageInterface<any>) => {
                return dbMsg.code === DbMessagesConstants.CODE_OK;
            });
    }

    public updateOrderNote(order:OrderObject, newNote:OrderNoteObject):Promise<boolean> {
        return this.orderService.updateOrderNote(order,newNote)
            .then( (dbMsg:DataBaseMessageInterface<any>) => {
                return dbMsg.code === DbMessagesConstants.CODE_OK;
            });
    }

    public updateOrderRowNote(orderRow:OrderRowObject, newNote:OrderNoteObject):Promise<boolean> {
        return this.orderService.updateOrderRowNote(orderRow,newNote)
            .then( (dbMsg:DataBaseMessageInterface<any>) => {
                return dbMsg.code === DbMessagesConstants.CODE_OK;
            });
    }

    public monitorOrderRowStart(monitorOrderRow:MonitorOrderRowObject):Promise<void> {
        let actionPromise:Promise<void>;
        if(monitorOrderRow.orderRow && monitorOrderRow.order) {
            //Update server
            const rowUpdatePromise:Promise<boolean> = this.updateOrderRowStatus(monitorOrderRow.orderRow,OrderConstants.STATUS_IN_PROGRESS)
                .then( (result:boolean) => {
                    if(result) {
                        //Update Client
                        monitorOrderRow.orderRow.status = OrderConstants.STATUS_IN_PROGRESS;
                    }
                    return result;
                });
            actionPromise = rowUpdatePromise
                .then( (result:boolean) => {
                    if( result && (monitorOrderRow.order.status !== OrderConstants.STATUS_IN_PROGRESS) ) {
                        //Update server
                        return this.updateOrderStatus(monitorOrderRow.order,OrderConstants.STATUS_IN_PROGRESS)
                            .then( (result:boolean) => {
                                if(result) {
                                    //Update Client
                                    monitorOrderRow.order.status = OrderConstants.STATUS_IN_PROGRESS;
                                }
                            });
                    }
                });

        }
        return this.$q.when(<IPromise<void>>actionPromise)
            .then( (result) => {
                //handle result
            }).catch( (error) => {
                //handle error... maybe actionPromise=undefined
            });
    }

    public monitorOrderRowReady(monitorOrderRow:MonitorOrderRowObject):Promise<void> {
        let actionPromise:Promise<void>;
        if(monitorOrderRow.orderRow && monitorOrderRow.order) {
            //Update server
            const rowUpdatePromise:Promise<boolean> = this.updateOrderRowStatus(monitorOrderRow.orderRow,OrderConstants.STATUS_READY)
                .then( (result:boolean) => {
                    if(result) {
                        //Update Client
                        monitorOrderRow.orderRow.status = OrderConstants.STATUS_READY;
                    }
                    return result;
                });

            actionPromise = rowUpdatePromise
                .then( (result:boolean) => {
                    if( result && monitorOrderRow.order.isReady ) {
                        //Update server
                        return this.updateOrderStatus(monitorOrderRow.order,OrderConstants.STATUS_READY)
                            .then( (result:boolean) => {
                                if(result) {
                                    //Update Client
                                    monitorOrderRow.order.status = OrderConstants.STATUS_READY;
                                }
                            });
                    }
                });
        }
        return this.$q.when(<IPromise<void>>actionPromise)
            .then( (result) => {
                //handle result
            }).catch( (error) => {
                //handle error... maybe actionPromise=undefined
            });
    }

    public static OrdersToMonitorRows(orders:OrderObject[]):MonitorOrderRowObject[] {
        //TODO - code review
        let rows:MonitorOrderRowObject[] = [];
        for(let i=0; i<orders.length; i++) {
            for(let j=0; j<orders[i].orderRows.length; j++) {
                rows.push(new MonitorOrderRowObject(orders[i],orders[i].orderRows[j]))
            }
        }

        return rows;
    }
}
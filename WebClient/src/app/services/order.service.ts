import {OrderObject} from "../objects/order/order.object";
import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {CommunicationConstants} from "../constants/communication.constants";
import {CommunicationService} from "./communication.service";
import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";
import {EditTicketObject} from "../objects/edit.ticket.object";
import {OrderFilterObject} from "../objects/order/order.filter.object";
import {OrderStatus} from "../constants/order.constants";
import {OrderRowObject} from "../objects/order/order.row.object";
import {OrderNoteObject} from "../objects/order/order.note.object";
import {UpdateTicket} from "../objects/update.ticket";
import {ProductObject} from "../objects/product/product.object";
import {RequestObject} from "../objects/request.object";
import {ProductService} from "./product.service";

export class OrderService implements NetworkServiceInterface<OrderObject,OrderObject>{

    constructor(private communicationService:CommunicationService,
                private productService:ProductService){
    }

    public addOrder(order:OrderObject):Promise<DataBaseMessageInterface<any>> {
        return this.communicationService.sendRequest<any>(CommunicationConstants.ADD_ORDER,order)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public editOrder(orgOrder:OrderObject, edtOrder:OrderObject, recordHistory:boolean = false):Promise<DataBaseMessageInterface<any>> {
        let ticket = new EditTicketObject<OrderObject>(orgOrder, edtOrder, recordHistory);
        return this.communicationService.sendRequest<any>(CommunicationConstants.EDIT_ORDER,ticket)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public updateOrderStatus(order:OrderObject, newStatus:OrderStatus):Promise<DataBaseMessageInterface<any>> {
        let ticket = new UpdateTicket<OrderObject,OrderStatus>(order,newStatus);
        return this.communicationService.sendRequest<any>(CommunicationConstants.UPDATE_ORDER_STATUS,ticket)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public updateOrderRowStatus(orderRow:OrderRowObject, newStatus:OrderStatus):Promise<DataBaseMessageInterface<any>> {
        let ticket = new UpdateTicket<OrderRowObject,OrderStatus>(orderRow,newStatus);
        return this.communicationService.sendRequest<any>(CommunicationConstants.UPDATE_ORDER_ROW_STATUS,ticket)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public updateOrderNote(order:OrderObject, newNote:OrderNoteObject):Promise<DataBaseMessageInterface<any>> {
        let ticket = new UpdateTicket<OrderObject,OrderNoteObject>(order,newNote);
        return this.communicationService.sendRequest<any>(CommunicationConstants.UPDATE_ORDER_NOTE,ticket)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public updateOrderRowNote(orderRow:OrderRowObject, newNote:OrderNoteObject):Promise<DataBaseMessageInterface<any>> {
        let ticket = new UpdateTicket<OrderRowObject,OrderNoteObject>(orderRow,newNote);
        return this.communicationService.sendRequest<any>(CommunicationConstants.UPDATE_ORDER_ROW_NOTE,ticket)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public getOrders(filter:OrderFilterObject):Promise<OrderObject[]> {
        return this.communicationService.sendRequest<OrderObject[]>(CommunicationConstants.GET_ORDERS,filter)
            .then( (srvMsg:ServerMessageInterface<OrderObject[]>) => {
                return this.deserializeArray(srvMsg.dbMsg);
            });
    }

    public getCommonProducts(limit:number = 5):Promise<ProductObject[]> {
        const reqObj = new RequestObject('OrderService:getCommonProducts',limit);
        return this.communicationService.sendRequest<ProductObject[]>(CommunicationConstants.GET_COMMON_PRODUCTS,reqObj)
            .then( (srvMsg:ServerMessageInterface<ProductObject[]>) => {
                return this.productService.deserializeArray(srvMsg.dbMsg);
            });
    }

    public getPreviousOrderVersion(order:OrderObject):Promise<OrderObject> {
        return this.communicationService.sendRequest<OrderObject>(CommunicationConstants.GET_PREVIOUS_ORDER_VERSION,order)
            .then( (srvMsg:ServerMessageInterface<OrderObject>) => {
                return this.deserialize(srvMsg.dbMsg);
            });
    }

    /* NetworkServiceInterface */
    convert(serverOrder:OrderObject):OrderObject {
        if(serverOrder) {
            let clientOrder = new OrderObject(serverOrder.id, serverOrder.version, serverOrder.customer, serverOrder.orderDate,
                serverOrder.supplyDate, serverOrder.notes, serverOrder.orderRows, serverOrder.status);
            return clientOrder.deserialize();
        }
        return null;
    }
    deserialize(dbMsg:DataBaseMessageInterface<OrderObject>):OrderObject {
        return this.convert(dbMsg.data);
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<OrderObject[]>):OrderObject[] {
        const serverData = dbMsg.data;
        let orders:OrderObject[] = [];
        if(serverData) {
            const len = serverData.length;
            for(let i=0; i<len; i++) {
                let serverOrder = serverData[i];
                let clientOrder = this.convert(serverOrder);
                orders.push( clientOrder );
            }
        }

        return orders;
    }
}
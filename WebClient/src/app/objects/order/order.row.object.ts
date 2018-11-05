import {ProductObject} from "../product/product.object";
import {OrderConstants, OrderStatus} from "../../constants/order.constants";
import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";
import {OrderNoteObject} from "./order.note.object";

export class OrderRowObject implements NetworkObjectInterface<OrderRowObject,Object>{

    public orderId:number;
    public orderVersion:number;
    public rowNumber:number;
    public product:ProductObject;
    public amount:number;
    public notes:OrderNoteObject;
    public status:OrderStatus;

    constructor(orderId:number,orderVersion:number,rowNumber:number,product:ProductObject, amount:number, notes:OrderNoteObject, status:OrderStatus = OrderConstants.STATUS_NEW){
        this.orderId = orderId;
        this.orderVersion = orderVersion;
        this.rowNumber = rowNumber;
        this.product = product;
        this.amount = amount;
        this.notes = notes;
        this.status = status;
    }

    public get monitorStatus():OrderStatus {
        return this.status;
    }

    public get isNew():boolean {
        return this.status === OrderConstants.STATUS_NEW;
    }

    public get isDirty():boolean {
        return this.status.code > OrderConstants.STATUS_NEW.code;
    }

    public get isStartEnabled():boolean {
        return this.status.code < OrderConstants.STATUS_IN_PROGRESS.code;
    }

    public get isInProgress():boolean {
        return this.status === OrderConstants.STATUS_IN_PROGRESS;
    }

    public get isReady():boolean {
        return this.status === OrderConstants.STATUS_READY;
    }
    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():OrderRowObject {
        this.product = new ProductObject(this.product.id, this.product.category, this.product.name, this.product.isDeleted).deserialize();
        this.notes = new OrderNoteObject(this.notes.note, this.notes.isResolved);
        let statusCode = parseInt(this.status.toString());
        this.status = OrderConstants.GetStatus(statusCode);

        return this;
    }
}
import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";
import {CustomerObject} from "../customer/customer.object";
import {OrderRowObject} from "./order.row.object";
import {OrderConstants, OrderStatus} from "../../constants/order.constants";
import {OrderNoteObject} from "./order.note.object";

export class OrderObject implements NetworkObjectInterface<OrderObject,Object>{

    public id:number;
    public version:number;
    public customer:CustomerObject;
    public orderDate:Date;
    public supplyDate:Date;
    public notes:OrderNoteObject;
    public orderRows:OrderRowObject[];
    public status:OrderStatus;

    constructor(id:number, version: number, customer:CustomerObject, orderDate:Date, supplyDate:Date, notes:OrderNoteObject,
                orderRows:OrderRowObject[], status:OrderStatus = OrderConstants.STATUS_NEW,){
        this.id = id;
        this.version = version;
        this.customer = customer;
        this.orderDate = orderDate;
        this.supplyDate = supplyDate;
        this.notes = notes;
        this.orderRows = orderRows;
        this.status = status;
    }

    public get isNotesResolved():boolean {
        let isRowsNotesResolved = true;
        const len = this.orderRows.length;
        for(let i=0;i<len;i++) {
            if(!this.orderRows[i].notes.isReallyResolved) {
                isRowsNotesResolved = false;
                break;
            }
        }
        return this.notes.isReallyResolved && isRowsNotesResolved;
    }

    public get isUnApproved():boolean {
        return this.status.code < OrderConstants.STATUS_APPROVED.code;
    }

    public get isInProductionMode():boolean {
        return this.status.code >= OrderConstants.STATUS_APPROVED.code &&
            this.status.code < OrderConstants.STATUS_DELIVERIES.code;
    }

    public get isCanceled():boolean {
        return this.status === OrderConstants.STATUS_CANCELED;
    }

    public get isDirty():boolean {
        return this.status.code > OrderConstants.STATUS_NEW.code;
    }

    public get isActive():boolean {
        return this.status.code >= OrderConstants.STATUS_APPROVED.code && this.status.code < OrderConstants.STATUS_SUPPLIED.code;
    }

    public get isUpdated():boolean {
        return this.status.code === OrderConstants.STATUS_UPDATED.code;
    }

    public get isOnDelay():boolean {
        const nowDateTime = new Date();
        return ( (this.status.code < OrderConstants.STATUS_SUPPLIED.code) && (this.supplyDate < nowDateTime) );
    }

    public get isInProgress():boolean {
        const len = this.orderRows.length;
        for(let i=0; i<len; i++) {
            if(this.orderRows[i].isInProgress) {
                return true;
            }
        }
        return false;
    }

    public get isReady():boolean {
        const len = this.orderRows.length;
        for(let i=0; i<len; i++) {
            if( !this.orderRows[i].isReady ) {
                return false;
            }
        }
        return true;
    }

    public get isRowsDirty():boolean {
        const len = this.orderRows.length;
        for(let i=0; i<len; i++) {
            if(this.orderRows[i].isDirty) {
                return true;
            }
        }
        return false;
    }

    public get isInDeliveries():boolean {
        return this.status.code >= OrderConstants.STATUS_DELIVERIES.code && this.status.code <= OrderConstants.STATUS_SUPPLIED.code;
    }

    public get isWaitingPacking():boolean {
        return this.status === OrderConstants.STATUS_DELIVERIES;
    }

    public get isPacking():boolean {
        return this.status === OrderConstants.STATUS_PACKING;
    }

    public get isPacked():boolean {
        return this.status === OrderConstants.STATUS_PACKED;
    }

    public get isSupplied():boolean {
        return this.status === OrderConstants.STATUS_SUPPLIED;
    }

    public getOrderRowsStatus():OrderStatus {
        if( this.isInProgress ) {
            return OrderConstants.STATUS_IN_PROGRESS;
        }
        if( this.isReady ) {
            return OrderConstants.STATUS_READY;
        }
        if( this.isRowsDirty ) {
            return OrderConstants.STATUS_IN_PROGRESS;
        }
        return OrderConstants.STATUS_NEW;
    }

    public get monitorStatus():OrderStatus {
        if( this.isOnDelay ) {
            return OrderConstants.STATUS_ON_DELAY;
        }
        if( this.isUpdated ) {
            return OrderConstants.STATUS_UPDATED;
        }
        if( this.isUnApproved ) {
            return OrderConstants.STATUS_WAITING_APPROVE;
        }

        return this.status;
    }

    public get progress():number {
        if( this.isInProductionMode ) {
            return this.productionProgress();
        }
        return this.deliveryProgress();
    }

    public productionProgress():number {
        let _progress = 0;
        switch (this.status) {
            case OrderConstants.STATUS_APPROVED:
                _progress = 10;
                break;
            case OrderConstants.STATUS_IN_PROGRESS:
                _progress = this.calculateOrderRowsProgress(10);
                break;
            case OrderConstants.STATUS_READY:
                _progress = 95;
                break;
            case OrderConstants.STATUS_DELIVERIES:
                _progress = 100;
                break;
        }
        return _progress;
    }

    public deliveryProgress():number {
        let _progress = 0;
        switch (this.status) {
            case OrderConstants.STATUS_PACKING:
                _progress = 30;
                break;
            case OrderConstants.STATUS_PACKED:
                _progress = 90;
                break;
            case OrderConstants.STATUS_SUPPLIED:
                _progress = 100;
                break;
        }
        return _progress;
    }

    private calculateOrderRowsProgress(startProgress:number):number {
        // IN_PROGRESS = 40% (in total)
        // READY = 40% (in total)
        // Each status (2) will be 40 divide by number of order rows
        let _progress = startProgress;
        const count = this.orderRows.length;
        const progressStatusValue = 40/count;

        for(let i=0; i<count; i++) {
            if(this.orderRows[i].status === OrderConstants.STATUS_IN_PROGRESS) {
                _progress += progressStatusValue;
            }else if( this.orderRows[i].status === OrderConstants.STATUS_READY) {
                _progress += (2 * progressStatusValue);
            }
        }
        return Math.round( _progress*100 )/100;  //Round to at most 2 decimal places
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():OrderObject {
        this.customer = new CustomerObject(this.customer.id, this.customer.name, this.customer.phone,
            this.customer.isDeleted).deserialize();
        // https://stackoverflow.com/questions/13622142/javascript-to-convert-utc-to-local-time
        this.orderDate = new Date( this.orderDate + ' UTC');
        this.supplyDate = new Date( this.supplyDate + ' UTC');
        this.notes = new OrderNoteObject(this.notes.note, this.notes.isResolved);
        this.orderRows.forEach( (row, ind, arr) => {
            arr[ind] = new OrderRowObject(row.orderId, row.orderVersion, row.rowNumber, row.product, row.amount, row.notes, row.status).deserialize();
        });

        let statusCode = parseInt(this.status.toString());
        this.status = OrderConstants.GetStatus(statusCode);

        return this;
    }
}
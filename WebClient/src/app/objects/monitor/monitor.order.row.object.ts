import {OrderRowObject} from "../order/order.row.object";
import {OrderObject} from "../order/order.object";
import {OrderConstants, OrderStatus} from "../../constants/order.constants";

export class MonitorOrderRowObject {

    //TODO - code review
    public order:OrderObject;
    public orderRow:OrderRowObject;

    constructor(order:OrderObject, orderRow:OrderRowObject){
        this.order = order;
        this.orderRow = orderRow;
    }

    public get progress():number {
        //Combined progress - this is not percentage, it work as a value system. View calculation method to understand
        let _progress = 0;
        const amount = this.orderRow.amount;
        switch (this.orderRow.status) {
            case OrderConstants.STATUS_IN_PROGRESS:
                _progress = amount*0.5;
                break;
            case OrderConstants.STATUS_READY:
                _progress = amount;
                break;
        }
        return _progress;
    }

    public get monitorStatus():OrderStatus {
        return this.orderRow.status;
    }
}
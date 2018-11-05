import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";
import {DateHelper} from "../../helpers/date.helper";
import {OrderConstants, OrderStatus} from "../../constants/order.constants";
import {CustomerObject} from "../customer/customer.object";
import {ProductObject} from "../product/product.object";

export class OrderFilterObject implements NetworkObjectInterface<OrderFilterObject,Object>{

    //  Filter parameters
    public orderFromDate:Date;
    public orderToDate:Date;
    public supplyToDate:Date;
    public statusLessThan:OrderStatus;
    public statusGreaterThan:OrderStatus;
    public status:OrderStatus;
    public product:ProductObject;
    public customer:CustomerObject;

    //  Client Information
    public clientDateTime:Date;

    constructor(orderFromDate:Date, orderToDate:Date, supplyToDate:Date = null, statusLessThan = null, statusGreaterThan = null){
        this.orderFromDate = orderFromDate;
        this.orderToDate = orderToDate;
        this.supplyToDate = supplyToDate;
        this.statusLessThan = statusLessThan;
        this.statusGreaterThan = statusGreaterThan;

        this.clientDateTime = DateHelper.GetTodayDate();
    }

    public static Create():OrderFilterObject {
        return new OrderFilterObject(null, null);
    }

    public static GetCurrentMonthOrdersFilter():OrderFilterObject {
        const firstDateOfMonth = DateHelper.GetFirstDateOfMonth();
        const lastDateOfMonth = DateHelper.GetLastDateOfMonth(1);

        return new OrderFilterObject(firstDateOfMonth,lastDateOfMonth);
    }

    public static GetActiveOrdersFilter(toDate:Date):OrderFilterObject {
        return new OrderFilterObject(null, null, toDate,OrderConstants.STATUS_DELIVERIES);
    }

    public static GetOrdersForDeliveryFilter():OrderFilterObject {
        return new OrderFilterObject(null,null,null,OrderConstants.STATUS_SUPPLIED,OrderConstants.STATUS_READY);
    }

    public static GetStatisticsFilter(toDate:Date):OrderFilterObject {
        return new OrderFilterObject(null,null,toDate,OrderConstants.STATUS_SUPPLIED);
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():OrderFilterObject {
        return this;
    }
}
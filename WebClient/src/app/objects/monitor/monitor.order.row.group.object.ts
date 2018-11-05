import {MonitorOrderRowObject} from "./monitor.order.row.object";
import {OrderStatus} from "../../constants/order.constants";

export class MonitorOrderRowGroupObject {

    private items:MonitorOrderRowObject[];
    constructor(items:MonitorOrderRowObject[]){
        this.items = items;
    }

    public get progress():number {
        return MonitorOrderRowGroupObject.CalculateProgress(this.items);
    }

    public get monitorStatus():OrderStatus {
        return null;
    }

    public static SumAmount(items:MonitorOrderRowObject[]):number {
        let sum = 0;
        for(let i=0; i<items.length; i++) {
            sum+=items[i].orderRow.amount;
        }
        return sum;
    }

    public static CalculateProgress(items:MonitorOrderRowObject[]):number {
        const totalAmount = MonitorOrderRowGroupObject.SumAmount(items);
        let combinedProgress = 0;
        for(let i=0; i<items.length ; i++) {
            combinedProgress += items[i].progress;
        }

        const progress = (combinedProgress/totalAmount)*100;
        return Math.round( progress*100 )/100;
    }
}
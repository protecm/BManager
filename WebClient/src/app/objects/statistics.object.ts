import {NetworkObjectInterface} from "../interfaces/network.object.interface";
import {Base64Interface} from "../interfaces/base64.interface";
import {OrderConstants, OrderStatus} from "../constants/order.constants";

interface StatisticsStatusInterface {
    status:OrderStatus;
    count:number;
}
//  About Statistics Object -
//  The server will return 2 lists:
//  One with all active orders and their statuses
//  One with only On-Delay orders and their statuses
//  ***The On-Delay list is a sub list of the general one, in other words
//     the general list contains all the active orders, delayed or not, and the
//     On-Delay list contain only the delayed ones.
export class StatisticsObject implements NetworkObjectInterface<StatisticsObject,Object> {

    public general:StatisticsStatusInterface[];
    public onDelay:StatisticsStatusInterface[];

    public fixedGeneral:StatisticsStatusInterface[] = [];
    public fixedOnDelay:StatisticsStatusInterface[] = [];

    constructor(general:StatisticsStatusInterface[], onDelay:StatisticsStatusInterface[]) {
        this.general = general;
        this.onDelay = onDelay;
    }

    public get countMonitor():number {
        let count = 0;
        this.generalMonitorValues.forEach( (obj,ind,arr) => {
            count += obj;
        });
        return count;
    }

    public get countDeliveries():number {
        let count = 0;
        this.generalDeliveriesValues.forEach( (obj,ind,arr) => {
            count += obj;
        });
        return count;
    }

    public get generalMonitorValues():number[] {
        return this.getGeneralMonitorImpl<number>('count');
    }

    public get generalMonitorLabels():string[] {
        return this.getGeneralMonitorImpl<string>('status','description');
    }

    public get generalMonitorColors():string[] {
        return this.getGeneralMonitorImpl<string>('status','backgroundColor');
    }

    private getGeneralMonitorImpl<T>(key:string,subKey?:string):T[] {
        let data:T[] = [];
        for(let i=0; i<this.fixedGeneral.length; i++) {
            if( this.fixedGeneral[i].status.code >= OrderConstants.STATUS_DELIVERIES.code ) {
                break;
            }
            if(subKey) {
                data.push(this.fixedGeneral[i][key][subKey]);
            }else {
                data.push(this.fixedGeneral[i][key]);
            }
        }

        return data;
    }

    public get generalDeliveriesValues():number[] {
        return this.getGeneralDeliveriesImpl<number>('count');
    }

    public get generalDeliveriesLabels():string[] {
        return this.getGeneralDeliveriesImpl<string>('status','description');
    }

    public get generalDeliveriesColors():string[] {
        return this.getGeneralDeliveriesImpl<string>('status','backgroundColor');
    }

    public getGeneralDeliveriesImpl<T>(key:string,subKey?:string):T[] {
        let data:T[] = [];
        let i=0;
        while(i<this.fixedGeneral.length) {
            if( this.fixedGeneral[i].status.code >= OrderConstants.STATUS_DELIVERIES.code ) {
                break;
            }
            i++;
        }
        while(i<this.fixedGeneral.length) {
            if(this.fixedGeneral[i].status.code > OrderConstants.STATUS_SUPPLIED.code) {
                break;
            }
            if(subKey) {
                data.push(this.fixedGeneral[i][key][subKey]);
            }else {
                data.push(this.fixedGeneral[i][key]);
            }
            i++;
        }

        return data;
    }

    public get generalMonitorOnDelayValues():number[] {
        let data:number[] = [];
        for(let i=0; i<this.fixedOnDelay.length; i++) {
            if( this.fixedOnDelay[i].status.code >= OrderConstants.STATUS_DELIVERIES.code ) {
                break;
            }
            data.push(this.fixedOnDelay[i].count);
        }

        return data;
    }

    private mergeStatisticsData():void {
        this.mergeStatisticsDataImpl(this.general,this.fixedGeneral);
        this.mergeStatisticsDataImpl(this.onDelay,this.fixedOnDelay);
    }

    private mergeStatisticsDataImpl(sourceArr:StatisticsStatusInterface[], targetArr:StatisticsStatusInterface[]):void {
        const statusList = OrderConstants.STATUS_LIST;
        const listCount = statusList.length;
        for(let i=0; i<listCount; i++) {
            let count = 0;
            let status = statusList[i];

            //  TODO - performance double check
            sourceArr.forEach( (obj,ind,arr) => {
                if(obj.status === status) {
                    count = obj.count;
                    return false;
                }
            });

            targetArr.push({
                status: status,
                count: count
            });
        }
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():StatisticsObject {
        let len = this.general.length;
        for(let i=0; i<len; i++) {
            let generalStatus = this.general[i];

            let statusCode = parseInt(generalStatus.status.toString());
            generalStatus.status = OrderConstants.GetStatus(statusCode);
            generalStatus.count = parseInt(generalStatus.count.toString());
        }

        len = this.onDelay.length;
        for(let i=0; i<len; i++) {
            let onDelayStatus = this.onDelay[i];

            let statusCode = parseInt(onDelayStatus.status.toString());
            onDelayStatus.status = OrderConstants.GetStatus(statusCode);
            onDelayStatus.count = parseInt(onDelayStatus.count.toString());
        }

        this.mergeStatisticsData();
        return this;
    }
}
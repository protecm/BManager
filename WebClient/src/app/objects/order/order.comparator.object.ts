import {OrderObject} from "./order.object";
import {LoDashStatic} from "lodash";
import {OrderRowObject} from "./order.row.object";

export enum CompareStatus {
    EQUAL,
    UPDATED,
    REMOVED,
    NEW
}

export interface CompareResult {
    status:CompareStatus;
    type:string;
}

export interface CompareOrderRowInterface {
    source:OrderRowObject;
    target:OrderRowObject;
    result:CompareResult;
}

export class OrderComparatorObject {

    public static readonly RESULT_EQUAL:CompareResult = {
        status: CompareStatus.EQUAL,
        type: 'primary'
    };
    public static readonly RESULT_UPDATED:CompareResult = {
        status: CompareStatus.UPDATED,
        type: 'row-updated'
    };
    public static readonly RESULT_REMOVED:CompareResult = {
        status: CompareStatus.REMOVED,
        type: 'row-removed'
    };
    public static readonly RESULT_NEW:CompareResult = {
        status: CompareStatus.NEW,
        type: 'row-added'
    };

    private orderSource:OrderObject;
    private orderTarget:OrderObject;
    private lodash:LoDashStatic;

    public customer:CompareResult;
    public supplyDate:CompareResult;
    public notes:CompareResult;
    public sourceResults:CompareOrderRowInterface[];
    public targetResults:CompareOrderRowInterface[];

    constructor(orderSource:OrderObject, orderTarget:OrderObject, lodash:LoDashStatic){
        this.orderSource = orderSource;   //OLD
        this.orderTarget = orderTarget;   //NEW
        this.lodash = lodash;
        this.sourceResults = [];
        this.targetResults = [];
    }

    public compare():OrderComparatorObject {
        this.customer = this.orderSource.customer.isEqual(this.orderTarget.customer)?
            OrderComparatorObject.RESULT_EQUAL:OrderComparatorObject.RESULT_UPDATED;

        this.supplyDate = this.orderSource.supplyDate.getTime() === this.orderTarget.supplyDate.getTime() ?
            OrderComparatorObject.RESULT_EQUAL:OrderComparatorObject.RESULT_UPDATED;

        this.notes = this.orderSource.notes.note === this.orderTarget.notes.note ?
            OrderComparatorObject.RESULT_EQUAL:OrderComparatorObject.RESULT_UPDATED;

        this.compareOrderRows();
        return this;
    }

    private compareOrderRows():void {
        let rowsSource_c = this.lodash.cloneDeep(this.orderSource.orderRows);
        let rowsTarget_c = this.lodash.cloneDeep(this.orderTarget.orderRows);

        while(rowsTarget_c.length > 0) {
            const rowTarget = rowsTarget_c[0];
            rowsTarget_c.splice(0,1);
            const indexSource = this.lodash.findIndex(rowsSource_c, (row:OrderRowObject) => {
               return rowTarget.product.id === row.product.id;
            });
            if(indexSource === -1) {
                this.targetResults.push(this.getCompareObject(null,rowTarget,OrderComparatorObject.RESULT_NEW));
                continue;
            }

            const rowSource = rowsSource_c[indexSource];
            rowsSource_c.splice(indexSource,1);
            const compareRes = this.getCompareObject(rowSource,rowTarget);
            this.targetResults.push(compareRes);
            this.sourceResults.push(compareRes);
        }

        while(rowsSource_c.length > 0 ) {
            const rowSource = rowsSource_c[0];
            rowsSource_c.splice(0,1);
            this.sourceResults.push(this.getCompareObject(rowSource,null,OrderComparatorObject.RESULT_REMOVED));
        }
    }

    private getCompareObject(rowSource:OrderRowObject, rowTarget:OrderRowObject, result?:CompareResult):CompareOrderRowInterface {
        return {
            source: rowSource,
            target: rowTarget,
            result: result ? result:this.compareOrderRow(rowSource,rowTarget)
        };
    }

    private compareOrderRow(rowSource:OrderRowObject, rowTarget:OrderRowObject):CompareResult {
        if(!rowSource) return OrderComparatorObject.RESULT_NEW;
        if(!rowTarget) return OrderComparatorObject.RESULT_REMOVED;
        if(rowSource.product.id !== rowTarget.product.id) return OrderComparatorObject.RESULT_NEW;
        if(rowSource.amount !== rowTarget.amount) return OrderComparatorObject.RESULT_UPDATED;
        if(rowSource.notes.note !== rowTarget.notes.note) return OrderComparatorObject.RESULT_UPDATED;

        return OrderComparatorObject.RESULT_EQUAL;
    }
}
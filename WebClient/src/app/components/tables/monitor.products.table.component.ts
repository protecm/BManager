import {MonitorOrderRowObject} from "../../objects/monitor/monitor.order.row.object";
import {MonitorOrderRowGroupObject} from "../../objects/monitor/monitor.order.row.group.object";
import {IComponentOptions, IScope} from "angular";
import {OrderObject} from "../../objects/order/order.object";
import {MonitorService} from "../../services/monitor.service";
import {StateTableComponent, StateTableComponentOptions} from "./state.table.component";
import {BaseTableActionWrapperInterface} from "./base.table.component";

class MonitorProductsTableComponent extends StateTableComponent<OrderObject>{

    public isCollapsed = {};
    public isCollapsible:boolean;
    public isStartRowInProgress = {};
    public isReadyRowInProgress = {};
    public onRowStart:BaseTableActionWrapperInterface<MonitorOrderRowObject>;
    public onRowReady:BaseTableActionWrapperInterface<MonitorOrderRowObject>;
    public monitorOrderRows:MonitorOrderRowObject[];

    constructor(private $scope:IScope) {
        super();
    }

    public onRowClickImpl(key:number):void {
        this.toggleColapse(key);
    }

    public onRowStartImpl(monitorOrderRow:MonitorOrderRowObject):void {
        if( this.onRowStart ) {
            this.isStartRowInProgress[monitorOrderRow.orderRow.orderId + '-' + monitorOrderRow.orderRow.rowNumber] = true;
            this.onRowStart()(monitorOrderRow)
                .then( () => {
                    this.isStartRowInProgress[monitorOrderRow.orderRow.orderId + '-' + monitorOrderRow.orderRow.rowNumber] = false;
                });
        }
    }

    public onRowReadyImpl(monitorOrderRow:MonitorOrderRowObject):void {
        if( this.onRowReady ) {
            this.isReadyRowInProgress[monitorOrderRow.orderRow.orderId + '-' + monitorOrderRow.orderRow.rowNumber] = true;
            this.onRowReady()(monitorOrderRow)
                .then( () => {
                    this.isReadyRowInProgress[monitorOrderRow.orderRow.orderId + '-' + monitorOrderRow.orderRow.rowNumber] = false;
                });
        }
    }

    public deleteRow(key:number):void {
        if( this.onDeleteAction ) {
            this.isDeleteInProcess[key] = true;
            this.onDeleteAction()(key)
                .then( () => {
                    this.isDeleteInProcess[key] = false;
                });
        }
    }

    public sumAmount(items:MonitorOrderRowObject[]):number {
        return MonitorOrderRowGroupObject.SumAmount(items);
    }

    public toggleColapse(key:number) {
        this.isCollapsed[key] = !this.isCollapsed[key];
    }

    public $onInit():void {
        this.$scope.$watch(() => {
            return this.data;
        } , (newValue:OrderObject[], oldValue:OrderObject[]) => {
            this.monitorOrderRows = MonitorService.OrdersToMonitorRows(this.data);
        });
    }

    public $onDestroy():void {
    }
}

class MonitorProductsTableComponentOptions extends StateTableComponentOptions<OrderObject> {
    constructor() {
        super(MonitorProductsTableComponent,'app/templates/tables/monitor.products.table.template.html');
        this.bindings.isCollapsible = '<';
        this.bindings.onRowStart = '&?';
        this.bindings.onRowReady = '&?';
        this.bindings.hideProducts = '<';
    }
}

export var monitorProductsTableComponent:IComponentOptions = new MonitorProductsTableComponentOptions();
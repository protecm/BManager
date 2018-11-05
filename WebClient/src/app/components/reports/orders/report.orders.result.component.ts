import {IComponentController, IComponentOptions} from "angular";
import {ReportFormDataInterface, ReportResultCtrlInterface} from "../../../interfaces/report.result.ctrl.interface";
import {OrderObject} from "../../../objects/order/order.object";
import {ReportContainer} from "../report.component";
import {ReportConstants, ReportType} from "../../../constants/report.constants";
import {ReportOrdersFormSettingsInterface} from "./report.orders.form.component";
import {ReportOrdersGroupByConstants} from "./report.orders.group.by.constants";

class ReportOrdersResultComponent implements IComponentController,ReportResultCtrlInterface<OrderObject,ReportOrdersFormSettingsInterface> {

    private parent:ReportContainer;          //From component require
    public orders:OrderObject[];
    public settings:ReportOrdersFormSettingsInterface;

    constructor() {
    }

    public get type():ReportType {
        return ReportConstants.TYPE_ORDERS;
    }

    public get isVisible():boolean {
        return this.orders && ( this.orders.length > 0 );
    }

    public get isGroupByOrders():boolean {
        return this.settings && this.settings.groupBy &&
            (this.settings.groupBy.id === ReportOrdersGroupByConstants.GROUP_BY_ORDERS.id);
    }

    public get isGroupByProducts():boolean {
        return this.settings && this.settings.groupBy &&
            (this.settings.groupBy.id === ReportOrdersGroupByConstants.GROUP_BY_PRODUCTS.id);
    }

    public onDataChange(formData:ReportFormDataInterface<OrderObject,ReportOrdersFormSettingsInterface>):void {
        this.orders = formData.data;
        this.settings = formData.settings;
    }

    public print():void {
        window.print();
    }

    public $onInit():void {
        if(this.parent) {
            this.parent.registerResultCtrl(this);
        }
    }

    public $onDestroy():void {
    }
}

export var reportOrdersResultComponent:IComponentOptions = {
    controller: ReportOrdersResultComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    template: `<div class="col-sm-12">
                <orders-table data="vm.orders" state="'Definition'" show-products="vm.settings.showProducts" ng-if="vm.isGroupByOrders">
                </orders-table>
                <monitor-products-table data="vm.orders" state="'Definition'" sort-property="+order.supplyDate" hide-products="vm.settings.hideProducts"
                    ng-if="vm.isGroupByProducts">
                </monitor-products-table>
               </div>`
};
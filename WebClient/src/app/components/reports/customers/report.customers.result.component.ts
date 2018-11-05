import {ReportFormDataInterface, ReportResultCtrlInterface} from "../../../interfaces/report.result.ctrl.interface";
import {CustomerObject} from "../../../objects/customer/customer.object";
import {ReportContainer} from "../report.component";
import {ReportConstants, ReportType} from "../../../constants/report.constants";
import {IComponentController, IComponentOptions} from "angular";
import {ReportCustomersFormSettingsInterface} from "./report.customers.form.component";

class ReportCustomersResultComponent implements IComponentController,ReportResultCtrlInterface<CustomerObject,ReportCustomersFormSettingsInterface> {

    private parent:ReportContainer;          //From component require
    public customers:CustomerObject[];

    constructor() {
    }

    public get type():ReportType {
        return ReportConstants.TYPE_CUSTOMERS;
    }

    public get isVisible():boolean {
        return this.customers && ( this.customers.length > 0 );
    }

    public onDataChange(formData:ReportFormDataInterface<CustomerObject,ReportCustomersFormSettingsInterface>):void {
        this.customers = formData.data;
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

export var reportCustomersResultComponent:IComponentOptions = {
    controller: ReportCustomersResultComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    template: `<div class="col-sm-12">
                <customers-table data="vm.customers">
                </customers-table>
               </div>`
};
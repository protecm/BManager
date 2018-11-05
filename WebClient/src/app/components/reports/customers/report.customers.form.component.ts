import {IComponentController, IComponentOptions} from "angular";
import {ReportConstants, ReportType} from "../../../constants/report.constants";
import {ReportFormCtrlInterface} from "../../../interfaces/report.form.ctrl.interface";
import {CustomerService} from "../../../services/customer.service";
import {CustomerObject} from "../../../objects/customer/customer.object";
import {CustomerFilterObject} from "../../../objects/customer/customer.filter.object";
import {ReportContainer} from "../report.component";
import {ReportFormDataInterface} from "../../../interfaces/report.result.ctrl.interface";

export interface ReportCustomersFormSettingsInterface {
    //TODO - implement if needed
}

class ReportCustomersFormComponent implements IComponentController,ReportFormCtrlInterface<CustomerObject,ReportCustomersFormSettingsInterface>{

    private parent:ReportContainer;          //From component require
    public  isVisible:boolean;
    public isGenerateInProcess:boolean;

    public customerName:string;

    constructor(private customerService:CustomerService) {
    }

    public get type():ReportType {
        return ReportConstants.TYPE_CUSTOMERS;
    }

    public generate():Promise<ReportFormDataInterface<CustomerObject,ReportCustomersFormSettingsInterface>> {
        this.isGenerateInProcess = true;
        this.customerName = this.customerName ? this.customerName:'';
        const filter = new CustomerFilterObject(this.customerName, false);
        return this.getCustomersFromServer(filter)
            .then( (data:CustomerObject[]) => {
                this.isGenerateInProcess = false;
                return {
                    data: data,
                    settings: null
                };
            });
    }

    private getCustomersFromServer(filter:CustomerFilterObject):Promise<CustomerObject[]> {
        return this.customerService.getCustomers(filter);
    }

    public $onInit():void {
        if(this.parent) {
            this.parent.registerFormCtrl(this);
        }
    }

    public $onDestroy():void {
    }
}

export var reportCustomersFormComponent:IComponentOptions = {
    controller: ReportCustomersFormComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    templateUrl: 'app/templates/reports/report.customers.form.template.html'
};
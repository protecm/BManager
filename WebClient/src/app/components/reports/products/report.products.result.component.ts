import {IComponentController, IComponentOptions} from "angular";
import {ReportContainer} from "../report.component";
import {ProductObject} from "../../../objects/product/product.object";
import {ReportFormDataInterface, ReportResultCtrlInterface} from "../../../interfaces/report.result.ctrl.interface";
import {ReportConstants, ReportType} from "../../../constants/report.constants";
import {ReportProductsFormSettingsInterface} from "./report.products.form.component";

class ReportProductsResultComponent implements IComponentController,ReportResultCtrlInterface<ProductObject,ReportProductsFormSettingsInterface> {

    private parent:ReportContainer;          //From component require
    public products:ProductObject[];

    constructor() {
    }

    public get type():ReportType {
        return ReportConstants.TYPE_PRODUCTS;
    }

    public get isVisible():boolean {
        return this.products && ( this.products.length > 0 );
    }

    public onDataChange(formData:ReportFormDataInterface<ProductObject,ReportProductsFormSettingsInterface>):void {
        this.products = formData.data;
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


export var reportProductsResultComponent:IComponentOptions = {
    controller: ReportProductsResultComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    template: `<div class="col-sm-12">
                <products-table data="vm.products">
                </products-table>
               </div>`
};
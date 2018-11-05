import {IComponentController, IComponentOptions} from "angular";
import {ReportConstants, ReportType} from "../../../constants/report.constants";
import {ReportFormCtrlInterface} from "../../../interfaces/report.form.ctrl.interface";
import {CategoryObject} from "../../../objects/category.object";
import {CategoryService} from "../../../services/category.service";
import {ProductObject} from "../../../objects/product/product.object";
import {ProductService} from "../../../services/product.service";
import {ProductFilterObject} from "../../../objects/product/product.filter.object";
import {ReportContainer} from "../report.component";
import {ReportFormDataInterface} from "../../../interfaces/report.result.ctrl.interface";

export interface ReportProductsFormSettingsInterface {
    //TODO - implement if needed
}

class ReportProductsFormComponent implements IComponentController,ReportFormCtrlInterface<ProductObject,ReportProductsFormSettingsInterface> {

    private parent:ReportContainer;          //From component require
    public isGenerateInProcess:boolean;

    public isVisible:boolean;
    public productName:string;
    public selectedCategory:CategoryObject;
    public categories:CategoryObject[];

    constructor(private categoryService:CategoryService,
                private productService:ProductService) {
        this.getCategoriesFromServer();
    }

    public get type():ReportType {
        return ReportConstants.TYPE_PRODUCTS;
    }

    public generate():Promise<ReportFormDataInterface<ProductObject,ReportProductsFormSettingsInterface>> {
        this.isGenerateInProcess = true;
        this.productName = this.productName ? this.productName:'';
        const filter:ProductFilterObject = new ProductFilterObject(this.productName, this.selectedCategory, false);
        return this.getProductsFromServer(filter)
            .then( (data:ProductObject[]) => {
                this.isGenerateInProcess = false;
                return {
                    data: data,
                    settings: null
                };
            });
    }

    private getCategoriesFromServer():void {
        this.categoryService.getCategories()
            .then( (data:CategoryObject[]) => {
                this.categories = data;
            });
    }

    private getProductsFromServer(filter:ProductFilterObject):Promise<ProductObject[]> {
        return this.productService.getProducts(filter);
    }

    public $onInit():void {
        if(this.parent) {
            this.parent.registerFormCtrl(this);
        }
    }

    public $onDestroy():void {
    }
}

export var reportProductsFormComponent:IComponentOptions = {
    controller: ReportProductsFormComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    templateUrl: 'app/templates/reports/report.products.form.template.html'
};
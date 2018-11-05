import {IComponentOptions} from "angular";
import {TabManagerInterface} from "../interfaces/tab.manager.interface";
import {CallbackTriggerComponent} from "../interfaces/callback.service.interface";
import {CategoryService} from "../services/category.service";
import {ProductService} from "../services/product.service";

class ProductsComponent extends CallbackTriggerComponent implements TabManagerInterface{
    public vm:ProductsComponent;

    public TAB_INDEX_PRODUCTS_TAB = 0;
    public TAB_INDEX_CATEGORIES_TAB = 1;

    constructor(private categoryService:CategoryService,
                private productService:ProductService){
        super();
    }

    public tabSelected(ind:number):void {
        switch(ind) {
            case this.TAB_INDEX_PRODUCTS_TAB:
                this.trigger(this.productService,ind);
                break;
            case this.TAB_INDEX_CATEGORIES_TAB:
                this.trigger(this.categoryService,ind);
                break;
            default:
                break;
        }
    }
}

export var productsComponent:IComponentOptions = {
    controller: ProductsComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/products.template.html'
};
import {IComponentOptions} from "angular";
import {ProductObject} from "../../objects/product/product.object";
import {BaseTableComponent, BaseTableComponentOptions} from "./base.table.component";

class ProductsTableComponent extends BaseTableComponent<ProductObject> {

    constructor() {
        super();
    }

    public onRowClickImpl(product:ProductObject):void {
        if( this.onRowClick ) {
            this.onRowClick()(product)
                .then( () => {
                    // Event finished
                });
        }
    }

    public deleteRow(product:ProductObject):void {
        if( this.onDeleteAction ) {
            this.isDeleteInProcess[product.id] = true;
            this.onDeleteAction()(product)
                .then( () => {
                    this.isDeleteInProcess[product.id] = false;
                });
        }
    }
}

class ProductsTableComponentOptions extends BaseTableComponentOptions<ProductObject> {
    constructor() {
        super(ProductsTableComponent,'app/templates/tables/products.table.template.html');
    }
}

export var productsTableComponent:IComponentOptions = new ProductsTableComponentOptions();
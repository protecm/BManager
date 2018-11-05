import {IComponentOptions} from "angular";
import {CustomerObject} from "../../objects/customer/customer.object";
import {BaseTableComponent, BaseTableComponentOptions} from "./base.table.component";

class CustomersTableComponent extends BaseTableComponent<CustomerObject> {

    constructor() {
        super();
    }

    public onRowClickImpl(customer:CustomerObject):void {
        if( this.onRowClick ) {
            this.onRowClick()(customer)
                .then( () => {
                   // Event finished
                });
        }
    }

    public deleteRow(customer:CustomerObject):void {
        if( this.onDeleteAction ) {
            this.isDeleteInProcess[customer.id] = true;
            this.onDeleteAction()(customer)
                .then( () => {
                    this.isDeleteInProcess[customer.id] = false;
                });
        }
    }
}

class CustomersTableComponentOptions extends BaseTableComponentOptions<CustomerObject> {
    constructor() {
        super(CustomersTableComponent,'app/templates/tables/customers.table.template.html');
    }
}

export var customersTableComponent:IComponentOptions = new CustomersTableComponentOptions();
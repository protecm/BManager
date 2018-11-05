import {OrderObject} from "../../objects/order/order.object";
import {IComponentOptions} from "angular";
import {StateTableComponent, StateTableComponentOptions} from "./state.table.component";

class OrdersTableComponent extends StateTableComponent<OrderObject> {
    public showProducts:boolean;

    constructor() {
        super();
    }

    public onRowClickImpl(order:OrderObject):void {
        if( this.onRowClick ) {
            this.onRowClick()(order)
                .then( () => {
                    // Event finished
                });
        }
    }

    public deleteRow(order:OrderObject):void {
        if( this.onDeleteAction ) {
            this.isDeleteInProcess[order.id] = true;
            this.onDeleteAction()(order)
                .then( () => {
                    this.isDeleteInProcess[order.id] = false;
                });
        }
    }
}

class OrdersTableComponentOptions extends StateTableComponentOptions<OrderObject> {
    constructor() {
        super(OrdersTableComponent,'app/templates/tables/orders.table.template.html');
        this.bindings.showProducts = '<';
    }
}

export var ordersTableComponent:IComponentOptions = new OrdersTableComponentOptions();
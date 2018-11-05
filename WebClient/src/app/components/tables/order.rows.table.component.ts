import {OrderRowObject} from "../../objects/order/order.row.object";
import {IComponentOptions} from "angular";
import {StateTableComponent, StateTableComponentOptions} from "./state.table.component";

class OrderRowsTableComponent extends StateTableComponent<OrderRowObject> {

    constructor() {
        super();
    }

    public onRowClickImpl(orderRow:OrderRowObject):void {
        if( this.onRowClick ) {
            this.onRowClick()(orderRow)
                .then( () => {
                    // Event finished
                });
        }
    }

    public deleteRow(orderRow:OrderRowObject):void {
        if( this.onDeleteAction ) {
            this.isDeleteInProcess[orderRow.orderId + '-' + orderRow.rowNumber] = true;
            this.onDeleteAction()(orderRow)
                .then( () => {
                    this.isDeleteInProcess[orderRow.orderId + '-' + orderRow.rowNumber] = false;
                });
        }
    }
}

class OrderRowsTableComponentOptions extends StateTableComponentOptions<OrderRowObject> {
    constructor() {
        super(OrderRowsTableComponent,'app/templates/tables/order.rows.table.template.html');
    }
}

export var orderRowsTableComponent:IComponentOptions = new OrderRowsTableComponentOptions();
import {IComponentOptions} from "angular";
import {OrderRowObject} from "../objects/order/order.row.object";

class OrderRowPanelComponent {

    public orderRow:OrderRowObject;   //From Binding
    public type:string;               //From Binding
    constructor() {
    }
}

export var orderRowPanelComponent:IComponentOptions = {
    controller: OrderRowPanelComponent,
    controllerAs: 'vm',
    bindings: {
        orderRow: '<',
        type: '<'
    },
    template: `<div class="panel" ng-class="'panel-' + (vm.type || 'primary')">
                        <div class="panel-heading" style="padding: 5px;">
                            <div class="panel-title" style="height: 15px;">
                                <div class="col-sm-9">
                                    <span>
                                        {{ vm.orderRow.product.name }}
                                    </span>
                                </div>
                                <div class="col-sm-3">
                                    <span>
                                        {{ vm.orderRow.amount }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body" style="padding: 5px;">
                            <p>
                                {{ vm.orderRow.notes.note }}
                            </p>
                        </div>
                    </div>`
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderRowPanelComponent = /** @class */ (function () {
    function OrderRowPanelComponent() {
    }
    return OrderRowPanelComponent;
}());
exports.orderRowPanelComponent = {
    controller: OrderRowPanelComponent,
    controllerAs: 'vm',
    bindings: {
        orderRow: '<',
        type: '<'
    },
    template: "<div class=\"panel\" ng-class=\"'panel-' + (vm.type || 'primary')\">\n                        <div class=\"panel-heading\" style=\"padding: 5px;\">\n                            <div class=\"panel-title\" style=\"height: 15px;\">\n                                <div class=\"col-sm-9\">\n                                    <span>\n                                        {{ vm.orderRow.product.name }}\n                                    </span>\n                                </div>\n                                <div class=\"col-sm-3\">\n                                    <span>\n                                        {{ vm.orderRow.amount }}\n                                    </span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"panel-body\" style=\"padding: 5px;\">\n                            <p>\n                                {{ vm.orderRow.notes.note }}\n                            </p>\n                        </div>\n                    </div>"
};
//# sourceMappingURL=order.row.panel.component.js.map
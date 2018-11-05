"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var state_table_component_1 = require("./state.table.component");
var OrderRowsTableComponent = /** @class */ (function (_super) {
    __extends(OrderRowsTableComponent, _super);
    function OrderRowsTableComponent() {
        return _super.call(this) || this;
    }
    OrderRowsTableComponent.prototype.onRowClickImpl = function (orderRow) {
        if (this.onRowClick) {
            this.onRowClick()(orderRow)
                .then(function () {
                // Event finished
            });
        }
    };
    OrderRowsTableComponent.prototype.deleteRow = function (orderRow) {
        var _this = this;
        if (this.onDeleteAction) {
            this.isDeleteInProcess[orderRow.orderId + '-' + orderRow.rowNumber] = true;
            this.onDeleteAction()(orderRow)
                .then(function () {
                _this.isDeleteInProcess[orderRow.orderId + '-' + orderRow.rowNumber] = false;
            });
        }
    };
    return OrderRowsTableComponent;
}(state_table_component_1.StateTableComponent));
var OrderRowsTableComponentOptions = /** @class */ (function (_super) {
    __extends(OrderRowsTableComponentOptions, _super);
    function OrderRowsTableComponentOptions() {
        return _super.call(this, OrderRowsTableComponent, 'app/templates/tables/order.rows.table.template.html') || this;
    }
    return OrderRowsTableComponentOptions;
}(state_table_component_1.StateTableComponentOptions));
exports.orderRowsTableComponent = new OrderRowsTableComponentOptions();
//# sourceMappingURL=order.rows.table.component.js.map
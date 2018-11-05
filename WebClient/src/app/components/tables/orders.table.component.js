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
var OrdersTableComponent = /** @class */ (function (_super) {
    __extends(OrdersTableComponent, _super);
    function OrdersTableComponent() {
        return _super.call(this) || this;
    }
    OrdersTableComponent.prototype.onRowClickImpl = function (order) {
        if (this.onRowClick) {
            this.onRowClick()(order)
                .then(function () {
                // Event finished
            });
        }
    };
    OrdersTableComponent.prototype.deleteRow = function (order) {
        var _this = this;
        if (this.onDeleteAction) {
            this.isDeleteInProcess[order.id] = true;
            this.onDeleteAction()(order)
                .then(function () {
                _this.isDeleteInProcess[order.id] = false;
            });
        }
    };
    return OrdersTableComponent;
}(state_table_component_1.StateTableComponent));
var OrdersTableComponentOptions = /** @class */ (function (_super) {
    __extends(OrdersTableComponentOptions, _super);
    function OrdersTableComponentOptions() {
        var _this = _super.call(this, OrdersTableComponent, 'app/templates/tables/orders.table.template.html') || this;
        _this.bindings.showProducts = '<';
        return _this;
    }
    return OrdersTableComponentOptions;
}(state_table_component_1.StateTableComponentOptions));
exports.ordersTableComponent = new OrdersTableComponentOptions();
//# sourceMappingURL=orders.table.component.js.map
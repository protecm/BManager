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
var base_table_component_1 = require("./base.table.component");
var CustomersTableComponent = /** @class */ (function (_super) {
    __extends(CustomersTableComponent, _super);
    function CustomersTableComponent() {
        return _super.call(this) || this;
    }
    CustomersTableComponent.prototype.onRowClickImpl = function (customer) {
        if (this.onRowClick) {
            this.onRowClick()(customer)
                .then(function () {
                // Event finished
            });
        }
    };
    CustomersTableComponent.prototype.deleteRow = function (customer) {
        var _this = this;
        if (this.onDeleteAction) {
            this.isDeleteInProcess[customer.id] = true;
            this.onDeleteAction()(customer)
                .then(function () {
                _this.isDeleteInProcess[customer.id] = false;
            });
        }
    };
    return CustomersTableComponent;
}(base_table_component_1.BaseTableComponent));
var CustomersTableComponentOptions = /** @class */ (function (_super) {
    __extends(CustomersTableComponentOptions, _super);
    function CustomersTableComponentOptions() {
        return _super.call(this, CustomersTableComponent, 'app/templates/tables/customers.table.template.html') || this;
    }
    return CustomersTableComponentOptions;
}(base_table_component_1.BaseTableComponentOptions));
exports.customersTableComponent = new CustomersTableComponentOptions();
//# sourceMappingURL=customers.table.component.js.map
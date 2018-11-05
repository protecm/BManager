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
var ProductsTableComponent = /** @class */ (function (_super) {
    __extends(ProductsTableComponent, _super);
    function ProductsTableComponent() {
        return _super.call(this) || this;
    }
    ProductsTableComponent.prototype.onRowClickImpl = function (product) {
        if (this.onRowClick) {
            this.onRowClick()(product)
                .then(function () {
                // Event finished
            });
        }
    };
    ProductsTableComponent.prototype.deleteRow = function (product) {
        var _this = this;
        if (this.onDeleteAction) {
            this.isDeleteInProcess[product.id] = true;
            this.onDeleteAction()(product)
                .then(function () {
                _this.isDeleteInProcess[product.id] = false;
            });
        }
    };
    return ProductsTableComponent;
}(base_table_component_1.BaseTableComponent));
var ProductsTableComponentOptions = /** @class */ (function (_super) {
    __extends(ProductsTableComponentOptions, _super);
    function ProductsTableComponentOptions() {
        return _super.call(this, ProductsTableComponent, 'app/templates/tables/products.table.template.html') || this;
    }
    return ProductsTableComponentOptions;
}(base_table_component_1.BaseTableComponentOptions));
exports.productsTableComponent = new ProductsTableComponentOptions();
//# sourceMappingURL=products.table.component.js.map
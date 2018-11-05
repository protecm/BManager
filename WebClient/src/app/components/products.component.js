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
var callback_service_interface_1 = require("../interfaces/callback.service.interface");
var ProductsComponent = /** @class */ (function (_super) {
    __extends(ProductsComponent, _super);
    function ProductsComponent(categoryService, productService) {
        var _this = _super.call(this) || this;
        _this.categoryService = categoryService;
        _this.productService = productService;
        _this.TAB_INDEX_PRODUCTS_TAB = 0;
        _this.TAB_INDEX_CATEGORIES_TAB = 1;
        return _this;
    }
    ProductsComponent.prototype.tabSelected = function (ind) {
        switch (ind) {
            case this.TAB_INDEX_PRODUCTS_TAB:
                this.trigger(this.productService, ind);
                break;
            case this.TAB_INDEX_CATEGORIES_TAB:
                this.trigger(this.categoryService, ind);
                break;
            default:
                break;
        }
    };
    return ProductsComponent;
}(callback_service_interface_1.CallbackTriggerComponent));
exports.productsComponent = {
    controller: ProductsComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/products.template.html'
};
//# sourceMappingURL=products.component.js.map
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
var order_base_modal_component_1 = require("./order.base.modal.component");
var alert_constants_1 = require("../../../constants/alert.constants");
var OrderViewModalComponent = /** @class */ (function (_super) {
    __extends(OrderViewModalComponent, _super);
    function OrderViewModalComponent($uibModalInstance, $translate, customerService, productService, modalService, toastService, lodash, order) {
        var _this = _super.call(this, $uibModalInstance, customerService, productService, modalService, toastService, lodash, order) || this;
        _this.$translate = $translate;
        _this.title = _this.$translate.instant('VIEW_ORDER');
        _this.disableEdit(alert_constants_1.AlertConstants.ALERT_ORDER_VIEW_MODE);
        return _this;
    }
    OrderViewModalComponent.prototype.save = function (valid) {
        //  View mode - no action needed
    };
    return OrderViewModalComponent;
}(order_base_modal_component_1.OrderBaseModalComponent));
var orderViewModalComponent = /** @class */ (function (_super) {
    __extends(orderViewModalComponent, _super);
    function orderViewModalComponent(order) {
        var _this = _super.call(this, order) || this;
        _this.controller = OrderViewModalComponent;
        return _this;
    }
    return orderViewModalComponent;
}(order_base_modal_component_1.OrderBaseModalSettings));
exports.orderViewModalComponent = orderViewModalComponent;
//# sourceMappingURL=order.view.modal.component.js.map
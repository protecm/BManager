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
var order_object_1 = require("../../../objects/order/order.object");
var db_messages_constants_1 = require("../../../constants/db.messages.constants");
var order_base_modal_component_1 = require("./order.base.modal.component");
var OrderAddModalComponent = /** @class */ (function (_super) {
    __extends(OrderAddModalComponent, _super);
    function OrderAddModalComponent($uibModalInstance, $translate, orderService, customerService, productService, modalService, toastService, lodash, order) {
        var _this = _super.call(this, $uibModalInstance, customerService, productService, modalService, toastService, lodash, order) || this;
        _this.$translate = $translate;
        _this.orderService = orderService;
        _this.title = _this.$translate.instant('ADD_ORDER');
        _this.id = _this.$translate.instant('NEW');
        return _this;
    }
    OrderAddModalComponent.prototype.save = function (valid) {
        var _this = this;
        if (valid) {
            this.isSaveInProcess = true;
            this.mergeDateTime(this.orderDate, this.orderTime);
            this.mergeDateTime(this.supplyDate, this.supplyTime);
            var order_1 = new order_object_1.OrderObject(null, this.version, this.selectedCustomer, this.orderDate, this.supplyDate, this.notes, this.orderRows);
            this.orderService.addOrder(order_1).then(function (dbMsg) {
                _this.isSaveInProcess = false;
                if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                    order_1.id = dbMsg.data;
                    _this.$uibModalInstance.close(order_1);
                }
                else if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_MYSQL_DUPLICATE_KEY) {
                    //handle error
                }
                else {
                    //handle error
                }
            });
        }
    };
    return OrderAddModalComponent;
}(order_base_modal_component_1.OrderBaseModalComponent));
var orderAddModalComponent = /** @class */ (function (_super) {
    __extends(orderAddModalComponent, _super);
    function orderAddModalComponent(order) {
        var _this = _super.call(this, order) || this;
        _this.controller = OrderAddModalComponent;
        return _this;
    }
    return orderAddModalComponent;
}(order_base_modal_component_1.OrderBaseModalSettings));
exports.orderAddModalComponent = orderAddModalComponent;
//# sourceMappingURL=order.add.modal.component.js.map
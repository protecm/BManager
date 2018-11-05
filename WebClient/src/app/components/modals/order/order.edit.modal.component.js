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
var alert_constants_1 = require("../../../constants/alert.constants");
var order_constants_1 = require("../../../constants/order.constants");
var OrderEditModalComponent = /** @class */ (function (_super) {
    __extends(OrderEditModalComponent, _super);
    function OrderEditModalComponent($uibModalInstance, $translate, orderService, customerService, productService, modalService, toastService, lodash, order) {
        var _this = _super.call(this, $uibModalInstance, customerService, productService, modalService, toastService, lodash, order) || this;
        _this.$translate = $translate;
        _this.orderService = orderService;
        _this.title = _this.$translate.instant('EDIT_ORDER');
        _this.setEditMode();
        return _this;
    }
    OrderEditModalComponent.prototype.save = function (valid) {
        var _this = this;
        if (valid) {
            this.isSaveInProcess = true;
            this.mergeDateTime(this.orderDate, this.orderTime);
            this.mergeDateTime(this.supplyDate, this.supplyTime);
            var editVersion_1 = this.version + 1;
            var editOrderRows = this.orderRows.map(function (x) {
                x.orderVersion = editVersion_1;
                return x;
            });
            var recordHistory = this.order.isActive;
            var editStatus = recordHistory ? order_constants_1.OrderConstants.STATUS_UPDATED : this.order.status;
            var editedOrder_1 = new order_object_1.OrderObject(this.id, editVersion_1, this.selectedCustomer, this.orderDate, this.supplyDate, this.notes, editOrderRows, editStatus);
            this.orderService.editOrder(this.order, editedOrder_1, recordHistory).then(function (dbMsg) {
                _this.isSaveInProcess = false;
                if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                    _this.$uibModalInstance.close(editedOrder_1);
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
    OrderEditModalComponent.prototype.cancelOrder = function () {
        var _this = this;
        var canceledOrder = new order_object_1.OrderObject(this.id, this.version, this.selectedCustomer, this.orderDate, this.supplyDate, this.notes, this.orderRows, order_constants_1.OrderConstants.STATUS_CANCELED);
        this.orderService.updateOrderStatus(this.order, order_constants_1.OrderConstants.STATUS_CANCELED)
            .then(function (dbMsg) {
            if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                _this.$uibModalInstance.close(canceledOrder);
            }
            else {
                //handle error
            }
        });
    };
    OrderEditModalComponent.prototype.setEditMode = function () {
        if (this.order && this.order.isDirty) {
            if (this.order.isInProductionMode) {
                this.disableEdit(alert_constants_1.AlertConstants.ALERT_ORDER_APPROVED);
            }
            else if (this.order.isSupplied) {
                this.disableEdit(alert_constants_1.AlertConstants.ALERT_ORDER_SUPPLIED);
            }
            else if (this.order.isInDeliveries) {
                this.disableEdit(alert_constants_1.AlertConstants.ALERT_ORDER_IN_DELIVERIES);
            }
            else if (this.order.isCanceled) {
                this.disableEdit(alert_constants_1.AlertConstants.ALERT_ORDER_CANCELED);
            }
        }
    };
    return OrderEditModalComponent;
}(order_base_modal_component_1.OrderBaseModalComponent));
var orderEditModalComponent = /** @class */ (function (_super) {
    __extends(orderEditModalComponent, _super);
    function orderEditModalComponent(order) {
        var _this = _super.call(this, order) || this;
        _this.controller = OrderEditModalComponent;
        return _this;
    }
    return orderEditModalComponent;
}(order_base_modal_component_1.OrderBaseModalSettings));
exports.orderEditModalComponent = orderEditModalComponent;
//# sourceMappingURL=order.edit.modal.component.js.map
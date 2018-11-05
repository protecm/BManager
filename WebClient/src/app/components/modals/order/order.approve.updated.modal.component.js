"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_comparator_object_1 = require("../../../objects/order/order.comparator.object");
var order_constants_1 = require("../../../constants/order.constants");
var language_interface_1 = require("../../../interfaces/language.interface");
var OrderApproveUpdatedModalComponent = /** @class */ (function () {
    function OrderApproveUpdatedModalComponent($uibModalInstance, monitorService, languageService, $translate, lodash, currOrder, prevOrder) {
        this.$uibModalInstance = $uibModalInstance;
        this.monitorService = monitorService;
        this.languageService = languageService;
        this.$translate = $translate;
        this.lodash = lodash;
        this.currOrder = currOrder;
        this.prevOrder = prevOrder;
        this.title = this.$translate.instant('APPROVE_ORDER');
        this.compareRes = new order_comparator_object_1.OrderComparatorObject(prevOrder, currOrder, this.lodash).compare();
    }
    Object.defineProperty(OrderApproveUpdatedModalComponent.prototype, "arrowDirection", {
        get: function () {
            if (this.languageService.language.direction === language_interface_1.LanguageDirection.RTL) {
                return 'left';
            }
            return 'right';
        },
        enumerable: true,
        configurable: true
    });
    OrderApproveUpdatedModalComponent.prototype.approve = function (valid) {
        var _this = this;
        if (valid) {
            this.isApproveInProgress = true;
            //Update Server, Detect status of order, check rows...
            var rowsStatus = this.currOrder.getOrderRowsStatus();
            var orderStatus_1 = rowsStatus === order_constants_1.OrderConstants.STATUS_NEW ?
                order_constants_1.OrderConstants.STATUS_APPROVED : rowsStatus;
            this.monitorService.updateOrderStatus(this.currOrder, orderStatus_1)
                .then(function (result) {
                _this.isApproveInProgress = false;
                if (result) {
                    _this.$uibModalInstance.close(orderStatus_1);
                }
                else {
                    //handle error
                }
            });
        }
    };
    OrderApproveUpdatedModalComponent.prototype.cancel = function () {
        this.$uibModalInstance.dismiss();
    };
    return OrderApproveUpdatedModalComponent;
}());
var orderApproveUpdatedModalComponent = /** @class */ (function () {
    function orderApproveUpdatedModalComponent(currOrder, prevOrder) {
        this.animation = true;
        this.backdrop = 'static';
        this.controller = OrderApproveUpdatedModalComponent;
        this.bindToController = true;
        this.controllerAs = 'vm';
        this.templateUrl = 'app/templates/modals/order.approve.updated.modal.template.html';
        this.size = 'lg';
        this.resolve = {
            currOrder: function () { return currOrder; },
            prevOrder: function () { return prevOrder; }
        };
    }
    return orderApproveUpdatedModalComponent;
}());
exports.orderApproveUpdatedModalComponent = orderApproveUpdatedModalComponent;
//# sourceMappingURL=order.approve.updated.modal.component.js.map
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
var order_filter_object_1 = require("../objects/order/order.filter.object");
var callback_service_interface_1 = require("../interfaces/callback.service.interface");
var DeliveriesService = /** @class */ (function (_super) {
    __extends(DeliveriesService, _super);
    function DeliveriesService(orderService, $interval) {
        var _this = _super.call(this, $interval) || this;
        _this.orderService = orderService;
        _this.cacheData = {};
        return _this;
    }
    DeliveriesService.prototype.getOrders = function () {
        var _this = this;
        return this.orderService.getOrders(order_filter_object_1.OrderFilterObject.GetOrdersForDeliveryFilter())
            .then(function (orders) {
            _this.timestamp = Date.now();
            _this.cacheData.deliveryOrdersCount = orders ? orders.length : 0;
            return orders;
        });
    };
    return DeliveriesService;
}(callback_service_interface_1.CallbackService));
exports.DeliveriesService = DeliveriesService;
//# sourceMappingURL=deliveries.service.js.map
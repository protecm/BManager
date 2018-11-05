"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_helper_1 = require("../../helpers/date.helper");
var order_constants_1 = require("../../constants/order.constants");
var OrderFilterObject = /** @class */ (function () {
    function OrderFilterObject(orderFromDate, orderToDate, supplyToDate, statusLessThan, statusGreaterThan) {
        if (supplyToDate === void 0) { supplyToDate = null; }
        if (statusLessThan === void 0) { statusLessThan = null; }
        if (statusGreaterThan === void 0) { statusGreaterThan = null; }
        this.orderFromDate = orderFromDate;
        this.orderToDate = orderToDate;
        this.supplyToDate = supplyToDate;
        this.statusLessThan = statusLessThan;
        this.statusGreaterThan = statusGreaterThan;
        this.clientDateTime = date_helper_1.DateHelper.GetTodayDate();
    }
    OrderFilterObject.Create = function () {
        return new OrderFilterObject(null, null);
    };
    OrderFilterObject.GetCurrentMonthOrdersFilter = function () {
        var firstDateOfMonth = date_helper_1.DateHelper.GetFirstDateOfMonth();
        var lastDateOfMonth = date_helper_1.DateHelper.GetLastDateOfMonth(1);
        return new OrderFilterObject(firstDateOfMonth, lastDateOfMonth);
    };
    OrderFilterObject.GetActiveOrdersFilter = function (toDate) {
        return new OrderFilterObject(null, null, toDate, order_constants_1.OrderConstants.STATUS_DELIVERIES);
    };
    OrderFilterObject.GetOrdersForDeliveryFilter = function () {
        return new OrderFilterObject(null, null, null, order_constants_1.OrderConstants.STATUS_SUPPLIED, order_constants_1.OrderConstants.STATUS_READY);
    };
    OrderFilterObject.GetStatisticsFilter = function (toDate) {
        return new OrderFilterObject(null, null, toDate, order_constants_1.OrderConstants.STATUS_SUPPLIED);
    };
    /* NetworkObjectInterface */
    OrderFilterObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    OrderFilterObject.prototype.deserialize = function () {
        return this;
    };
    return OrderFilterObject;
}());
exports.OrderFilterObject = OrderFilterObject;
//# sourceMappingURL=order.filter.object.js.map
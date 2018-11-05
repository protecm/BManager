"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_constants_1 = require("../../constants/order.constants");
var MonitorOrderRowObject = /** @class */ (function () {
    function MonitorOrderRowObject(order, orderRow) {
        this.order = order;
        this.orderRow = orderRow;
    }
    Object.defineProperty(MonitorOrderRowObject.prototype, "progress", {
        get: function () {
            //Combined progress - this is not percentage, it work as a value system. View calculation method to understand
            var _progress = 0;
            var amount = this.orderRow.amount;
            switch (this.orderRow.status) {
                case order_constants_1.OrderConstants.STATUS_IN_PROGRESS:
                    _progress = amount * 0.5;
                    break;
                case order_constants_1.OrderConstants.STATUS_READY:
                    _progress = amount;
                    break;
            }
            return _progress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonitorOrderRowObject.prototype, "monitorStatus", {
        get: function () {
            return this.orderRow.status;
        },
        enumerable: true,
        configurable: true
    });
    return MonitorOrderRowObject;
}());
exports.MonitorOrderRowObject = MonitorOrderRowObject;
//# sourceMappingURL=monitor.order.row.object.js.map
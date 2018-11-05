"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MonitorOrderRowGroupObject = /** @class */ (function () {
    function MonitorOrderRowGroupObject(items) {
        this.items = items;
    }
    Object.defineProperty(MonitorOrderRowGroupObject.prototype, "progress", {
        get: function () {
            return MonitorOrderRowGroupObject.CalculateProgress(this.items);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonitorOrderRowGroupObject.prototype, "monitorStatus", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    MonitorOrderRowGroupObject.SumAmount = function (items) {
        var sum = 0;
        for (var i = 0; i < items.length; i++) {
            sum += items[i].orderRow.amount;
        }
        return sum;
    };
    MonitorOrderRowGroupObject.CalculateProgress = function (items) {
        var totalAmount = MonitorOrderRowGroupObject.SumAmount(items);
        var combinedProgress = 0;
        for (var i = 0; i < items.length; i++) {
            combinedProgress += items[i].progress;
        }
        var progress = (combinedProgress / totalAmount) * 100;
        return Math.round(progress * 100) / 100;
    };
    return MonitorOrderRowGroupObject;
}());
exports.MonitorOrderRowGroupObject = MonitorOrderRowGroupObject;
//# sourceMappingURL=monitor.order.row.group.object.js.map
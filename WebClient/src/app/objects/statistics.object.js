"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_constants_1 = require("../constants/order.constants");
//  About Statistics Object -
//  The server will return 2 lists:
//  One with all active orders and their statuses
//  One with only On-Delay orders and their statuses
//  ***The On-Delay list is a sub list of the general one, in other words
//     the general list contains all the active orders, delayed or not, and the
//     On-Delay list contain only the delayed ones.
var StatisticsObject = /** @class */ (function () {
    function StatisticsObject(general, onDelay) {
        this.fixedGeneral = [];
        this.fixedOnDelay = [];
        this.general = general;
        this.onDelay = onDelay;
    }
    Object.defineProperty(StatisticsObject.prototype, "countMonitor", {
        get: function () {
            var count = 0;
            this.generalMonitorValues.forEach(function (obj, ind, arr) {
                count += obj;
            });
            return count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatisticsObject.prototype, "countDeliveries", {
        get: function () {
            var count = 0;
            this.generalDeliveriesValues.forEach(function (obj, ind, arr) {
                count += obj;
            });
            return count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatisticsObject.prototype, "generalMonitorValues", {
        get: function () {
            return this.getGeneralMonitorImpl('count');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatisticsObject.prototype, "generalMonitorLabels", {
        get: function () {
            return this.getGeneralMonitorImpl('status', 'description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatisticsObject.prototype, "generalMonitorColors", {
        get: function () {
            return this.getGeneralMonitorImpl('status', 'backgroundColor');
        },
        enumerable: true,
        configurable: true
    });
    StatisticsObject.prototype.getGeneralMonitorImpl = function (key, subKey) {
        var data = [];
        for (var i = 0; i < this.fixedGeneral.length; i++) {
            if (this.fixedGeneral[i].status.code >= order_constants_1.OrderConstants.STATUS_DELIVERIES.code) {
                break;
            }
            if (subKey) {
                data.push(this.fixedGeneral[i][key][subKey]);
            }
            else {
                data.push(this.fixedGeneral[i][key]);
            }
        }
        return data;
    };
    Object.defineProperty(StatisticsObject.prototype, "generalDeliveriesValues", {
        get: function () {
            return this.getGeneralDeliveriesImpl('count');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatisticsObject.prototype, "generalDeliveriesLabels", {
        get: function () {
            return this.getGeneralDeliveriesImpl('status', 'description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatisticsObject.prototype, "generalDeliveriesColors", {
        get: function () {
            return this.getGeneralDeliveriesImpl('status', 'backgroundColor');
        },
        enumerable: true,
        configurable: true
    });
    StatisticsObject.prototype.getGeneralDeliveriesImpl = function (key, subKey) {
        var data = [];
        var i = 0;
        while (i < this.fixedGeneral.length) {
            if (this.fixedGeneral[i].status.code >= order_constants_1.OrderConstants.STATUS_DELIVERIES.code) {
                break;
            }
            i++;
        }
        while (i < this.fixedGeneral.length) {
            if (this.fixedGeneral[i].status.code > order_constants_1.OrderConstants.STATUS_SUPPLIED.code) {
                break;
            }
            if (subKey) {
                data.push(this.fixedGeneral[i][key][subKey]);
            }
            else {
                data.push(this.fixedGeneral[i][key]);
            }
            i++;
        }
        return data;
    };
    Object.defineProperty(StatisticsObject.prototype, "generalMonitorOnDelayValues", {
        get: function () {
            var data = [];
            for (var i = 0; i < this.fixedOnDelay.length; i++) {
                if (this.fixedOnDelay[i].status.code >= order_constants_1.OrderConstants.STATUS_DELIVERIES.code) {
                    break;
                }
                data.push(this.fixedOnDelay[i].count);
            }
            return data;
        },
        enumerable: true,
        configurable: true
    });
    StatisticsObject.prototype.mergeStatisticsData = function () {
        this.mergeStatisticsDataImpl(this.general, this.fixedGeneral);
        this.mergeStatisticsDataImpl(this.onDelay, this.fixedOnDelay);
    };
    StatisticsObject.prototype.mergeStatisticsDataImpl = function (sourceArr, targetArr) {
        var statusList = order_constants_1.OrderConstants.STATUS_LIST;
        var listCount = statusList.length;
        var _loop_1 = function (i) {
            var count = 0;
            var status_1 = statusList[i];
            //  TODO - performance double check
            sourceArr.forEach(function (obj, ind, arr) {
                if (obj.status === status_1) {
                    count = obj.count;
                    return false;
                }
            });
            targetArr.push({
                status: status_1,
                count: count
            });
        };
        for (var i = 0; i < listCount; i++) {
            _loop_1(i);
        }
    };
    /* NetworkObjectInterface */
    StatisticsObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    StatisticsObject.prototype.deserialize = function () {
        var len = this.general.length;
        for (var i = 0; i < len; i++) {
            var generalStatus = this.general[i];
            var statusCode = parseInt(generalStatus.status.toString());
            generalStatus.status = order_constants_1.OrderConstants.GetStatus(statusCode);
            generalStatus.count = parseInt(generalStatus.count.toString());
        }
        len = this.onDelay.length;
        for (var i = 0; i < len; i++) {
            var onDelayStatus = this.onDelay[i];
            var statusCode = parseInt(onDelayStatus.status.toString());
            onDelayStatus.status = order_constants_1.OrderConstants.GetStatus(statusCode);
            onDelayStatus.count = parseInt(onDelayStatus.count.toString());
        }
        this.mergeStatisticsData();
        return this;
    };
    return StatisticsObject;
}());
exports.StatisticsObject = StatisticsObject;
//# sourceMappingURL=statistics.object.js.map
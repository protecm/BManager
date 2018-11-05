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
var date_helper_1 = require("../helpers/date.helper");
var order_constants_1 = require("../constants/order.constants");
var db_messages_constants_1 = require("../constants/db.messages.constants");
var monitor_order_row_object_1 = require("../objects/monitor/monitor.order.row.object");
var callback_service_interface_1 = require("../interfaces/callback.service.interface");
var MonitorService = /** @class */ (function (_super) {
    __extends(MonitorService, _super);
    function MonitorService(orderService, confService, $q, $interval) {
        var _this = _super.call(this, $interval) || this;
        _this.orderService = orderService;
        _this.confService = confService;
        _this.$q = $q;
        _this.cacheData = {};
        return _this;
    }
    MonitorService.prototype.getActiveMonitorOrdersRows = function () {
        return this.getActiveOrders()
            .then(function (orders) {
            return MonitorService.OrdersToMonitorRows(orders);
        });
    };
    MonitorService.prototype.getActiveOrders = function () {
        var _this = this;
        var hoursInterval = this.confService.configurationData.monitorActiveOrderHours;
        var toDate = date_helper_1.DateHelper.GetTodayDate(hoursInterval);
        return this.orderService.getOrders(order_filter_object_1.OrderFilterObject.GetActiveOrdersFilter(toDate))
            .then(function (orders) {
            _this.timestamp = Date.now();
            _this.cacheData.monitorOrdersCount = orders ? orders.length : 0;
            return orders;
        });
    };
    MonitorService.prototype.getPreviousOrderVersion = function (order) {
        return this.orderService.getPreviousOrderVersion(order);
    };
    MonitorService.prototype.updateOrderStatus = function (order, newStatus) {
        return this.orderService.updateOrderStatus(order, newStatus)
            .then(function (dbMsg) {
            return dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK;
        });
    };
    MonitorService.prototype.updateOrderRowStatus = function (orderRow, newStatus) {
        return this.orderService.updateOrderRowStatus(orderRow, newStatus)
            .then(function (dbMsg) {
            return dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK;
        });
    };
    MonitorService.prototype.updateOrderNote = function (order, newNote) {
        return this.orderService.updateOrderNote(order, newNote)
            .then(function (dbMsg) {
            return dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK;
        });
    };
    MonitorService.prototype.updateOrderRowNote = function (orderRow, newNote) {
        return this.orderService.updateOrderRowNote(orderRow, newNote)
            .then(function (dbMsg) {
            return dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK;
        });
    };
    MonitorService.prototype.monitorOrderRowStart = function (monitorOrderRow) {
        var _this = this;
        var actionPromise;
        if (monitorOrderRow.orderRow && monitorOrderRow.order) {
            //Update server
            var rowUpdatePromise = this.updateOrderRowStatus(monitorOrderRow.orderRow, order_constants_1.OrderConstants.STATUS_IN_PROGRESS)
                .then(function (result) {
                if (result) {
                    //Update Client
                    monitorOrderRow.orderRow.status = order_constants_1.OrderConstants.STATUS_IN_PROGRESS;
                }
                return result;
            });
            actionPromise = rowUpdatePromise
                .then(function (result) {
                if (result && (monitorOrderRow.order.status !== order_constants_1.OrderConstants.STATUS_IN_PROGRESS)) {
                    //Update server
                    return _this.updateOrderStatus(monitorOrderRow.order, order_constants_1.OrderConstants.STATUS_IN_PROGRESS)
                        .then(function (result) {
                        if (result) {
                            //Update Client
                            monitorOrderRow.order.status = order_constants_1.OrderConstants.STATUS_IN_PROGRESS;
                        }
                    });
                }
            });
        }
        return this.$q.when(actionPromise)
            .then(function (result) {
            //handle result
        }).catch(function (error) {
            //handle error... maybe actionPromise=undefined
        });
    };
    MonitorService.prototype.monitorOrderRowReady = function (monitorOrderRow) {
        var _this = this;
        var actionPromise;
        if (monitorOrderRow.orderRow && monitorOrderRow.order) {
            //Update server
            var rowUpdatePromise = this.updateOrderRowStatus(monitorOrderRow.orderRow, order_constants_1.OrderConstants.STATUS_READY)
                .then(function (result) {
                if (result) {
                    //Update Client
                    monitorOrderRow.orderRow.status = order_constants_1.OrderConstants.STATUS_READY;
                }
                return result;
            });
            actionPromise = rowUpdatePromise
                .then(function (result) {
                if (result && monitorOrderRow.order.isReady) {
                    //Update server
                    return _this.updateOrderStatus(monitorOrderRow.order, order_constants_1.OrderConstants.STATUS_READY)
                        .then(function (result) {
                        if (result) {
                            //Update Client
                            monitorOrderRow.order.status = order_constants_1.OrderConstants.STATUS_READY;
                        }
                    });
                }
            });
        }
        return this.$q.when(actionPromise)
            .then(function (result) {
            //handle result
        }).catch(function (error) {
            //handle error... maybe actionPromise=undefined
        });
    };
    MonitorService.OrdersToMonitorRows = function (orders) {
        //TODO - code review
        var rows = [];
        for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < orders[i].orderRows.length; j++) {
                rows.push(new monitor_order_row_object_1.MonitorOrderRowObject(orders[i], orders[i].orderRows[j]));
            }
        }
        return rows;
    };
    return MonitorService;
}(callback_service_interface_1.CallbackService));
exports.MonitorService = MonitorService;
//# sourceMappingURL=monitor.service.js.map
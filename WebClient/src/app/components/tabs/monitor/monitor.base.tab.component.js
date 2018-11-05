"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_constants_1 = require("../../../constants/order.constants");
var busy_helper_1 = require("../../../helpers/busy.helper");
var monitor_order_row_object_1 = require("../../../objects/monitor/monitor.order.row.object");
var MonitorBaseTabComponent = /** @class */ (function () {
    function MonitorBaseTabComponent(monitorService) {
        var _this = this;
        this.monitorService = monitorService;
        this.isInitRowInProgress = {};
        this.isStartRowInProgress = {};
        this.isReadyRowInProgress = {};
        this.isQuickBtnOpen = {};
        this.onRowStart = function (monitorOrderRow) {
            return _this.monitorService.monitorOrderRowStart(monitorOrderRow);
        };
        this.onRowReady = function (monitorOrderRow) {
            return _this.monitorService.monitorOrderRowReady(monitorOrderRow);
        };
        this.cgBusyOrders = busy_helper_1.BusyHelper.GetDefaultBusy('LOADING_ORDERS');
    }
    MonitorBaseTabComponent.prototype.quickActionOnRow = function (orderRow, order, newStatusDesc) {
        switch (newStatusDesc) {
            case order_constants_1.OrderConstants.STATUS_NEW.description:
                this.initRow(orderRow, order);
                break;
            case order_constants_1.OrderConstants.STATUS_IN_PROGRESS.description:
                this.startRow(orderRow, order);
                break;
            case order_constants_1.OrderConstants.STATUS_READY.description:
                this.readyRow(orderRow, order);
            default:
                //handle unknown action
                break;
        }
    };
    MonitorBaseTabComponent.prototype.initRow = function (orderRow, order) {
        var _this = this;
        //TODO - view the changes of start & ready actions... bellow
        if (orderRow && order) {
            //Update server
            this.isInitRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = true;
            this.monitorService.updateOrderRowStatus(orderRow, order_constants_1.OrderConstants.STATUS_NEW)
                .then(function (result) {
                _this.isInitRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = false;
                if (result) {
                    //Update Client
                    orderRow.status = order_constants_1.OrderConstants.STATUS_NEW;
                }
            });
            //Update order status, handle case when order is ready and you return a row to NEW state
            if (order.status === order_constants_1.OrderConstants.STATUS_READY) {
                //Update server
                this.monitorService.updateOrderStatus(order, order_constants_1.OrderConstants.STATUS_IN_PROGRESS)
                    .then(function (result) {
                    if (result) {
                        //Update Client
                        order.status = order_constants_1.OrderConstants.STATUS_IN_PROGRESS;
                    }
                });
            }
        }
    };
    MonitorBaseTabComponent.prototype.startRow = function (orderRow, order) {
        var _this = this;
        var monitorOrderRow = new monitor_order_row_object_1.MonitorOrderRowObject(order, orderRow);
        this.isStartRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = true;
        this.onRowStart(monitorOrderRow)
            .then(function () {
            _this.isStartRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = false;
        });
    };
    MonitorBaseTabComponent.prototype.readyRow = function (orderRow, order) {
        var _this = this;
        var monitorOrderRow = new monitor_order_row_object_1.MonitorOrderRowObject(order, orderRow);
        this.isReadyRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = true;
        this.onRowReady(monitorOrderRow)
            .then(function () {
            _this.isReadyRowInProgress[orderRow.orderId + '-' + orderRow.rowNumber] = false;
        });
    };
    return MonitorBaseTabComponent;
}());
exports.MonitorBaseTabComponent = MonitorBaseTabComponent;
//# sourceMappingURL=monitor.base.tab.component.js.map
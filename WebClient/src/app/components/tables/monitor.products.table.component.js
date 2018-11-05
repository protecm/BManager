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
var monitor_order_row_group_object_1 = require("../../objects/monitor/monitor.order.row.group.object");
var monitor_service_1 = require("../../services/monitor.service");
var state_table_component_1 = require("./state.table.component");
var MonitorProductsTableComponent = /** @class */ (function (_super) {
    __extends(MonitorProductsTableComponent, _super);
    function MonitorProductsTableComponent($scope) {
        var _this = _super.call(this) || this;
        _this.$scope = $scope;
        _this.isCollapsed = {};
        _this.isStartRowInProgress = {};
        _this.isReadyRowInProgress = {};
        return _this;
    }
    MonitorProductsTableComponent.prototype.onRowClickImpl = function (key) {
        this.toggleColapse(key);
    };
    MonitorProductsTableComponent.prototype.onRowStartImpl = function (monitorOrderRow) {
        var _this = this;
        if (this.onRowStart) {
            this.isStartRowInProgress[monitorOrderRow.orderRow.orderId + '-' + monitorOrderRow.orderRow.rowNumber] = true;
            this.onRowStart()(monitorOrderRow)
                .then(function () {
                _this.isStartRowInProgress[monitorOrderRow.orderRow.orderId + '-' + monitorOrderRow.orderRow.rowNumber] = false;
            });
        }
    };
    MonitorProductsTableComponent.prototype.onRowReadyImpl = function (monitorOrderRow) {
        var _this = this;
        if (this.onRowReady) {
            this.isReadyRowInProgress[monitorOrderRow.orderRow.orderId + '-' + monitorOrderRow.orderRow.rowNumber] = true;
            this.onRowReady()(monitorOrderRow)
                .then(function () {
                _this.isReadyRowInProgress[monitorOrderRow.orderRow.orderId + '-' + monitorOrderRow.orderRow.rowNumber] = false;
            });
        }
    };
    MonitorProductsTableComponent.prototype.deleteRow = function (key) {
        var _this = this;
        if (this.onDeleteAction) {
            this.isDeleteInProcess[key] = true;
            this.onDeleteAction()(key)
                .then(function () {
                _this.isDeleteInProcess[key] = false;
            });
        }
    };
    MonitorProductsTableComponent.prototype.sumAmount = function (items) {
        return monitor_order_row_group_object_1.MonitorOrderRowGroupObject.SumAmount(items);
    };
    MonitorProductsTableComponent.prototype.toggleColapse = function (key) {
        this.isCollapsed[key] = !this.isCollapsed[key];
    };
    MonitorProductsTableComponent.prototype.$onInit = function () {
        var _this = this;
        this.$scope.$watch(function () {
            return _this.data;
        }, function (newValue, oldValue) {
            _this.monitorOrderRows = monitor_service_1.MonitorService.OrdersToMonitorRows(_this.data);
        });
    };
    MonitorProductsTableComponent.prototype.$onDestroy = function () {
    };
    return MonitorProductsTableComponent;
}(state_table_component_1.StateTableComponent));
var MonitorProductsTableComponentOptions = /** @class */ (function (_super) {
    __extends(MonitorProductsTableComponentOptions, _super);
    function MonitorProductsTableComponentOptions() {
        var _this = _super.call(this, MonitorProductsTableComponent, 'app/templates/tables/monitor.products.table.template.html') || this;
        _this.bindings.isCollapsible = '<';
        _this.bindings.onRowStart = '&?';
        _this.bindings.onRowReady = '&?';
        _this.bindings.hideProducts = '<';
        return _this;
    }
    return MonitorProductsTableComponentOptions;
}(state_table_component_1.StateTableComponentOptions));
exports.monitorProductsTableComponent = new MonitorProductsTableComponentOptions();
//# sourceMappingURL=monitor.products.table.component.js.map
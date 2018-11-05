"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report_constants_1 = require("../../../constants/report.constants");
var report_orders_group_by_constants_1 = require("./report.orders.group.by.constants");
var ReportOrdersResultComponent = /** @class */ (function () {
    function ReportOrdersResultComponent() {
    }
    Object.defineProperty(ReportOrdersResultComponent.prototype, "type", {
        get: function () {
            return report_constants_1.ReportConstants.TYPE_ORDERS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportOrdersResultComponent.prototype, "isVisible", {
        get: function () {
            return this.orders && (this.orders.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportOrdersResultComponent.prototype, "isGroupByOrders", {
        get: function () {
            return this.settings && this.settings.groupBy &&
                (this.settings.groupBy.id === report_orders_group_by_constants_1.ReportOrdersGroupByConstants.GROUP_BY_ORDERS.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportOrdersResultComponent.prototype, "isGroupByProducts", {
        get: function () {
            return this.settings && this.settings.groupBy &&
                (this.settings.groupBy.id === report_orders_group_by_constants_1.ReportOrdersGroupByConstants.GROUP_BY_PRODUCTS.id);
        },
        enumerable: true,
        configurable: true
    });
    ReportOrdersResultComponent.prototype.onDataChange = function (formData) {
        this.orders = formData.data;
        this.settings = formData.settings;
    };
    ReportOrdersResultComponent.prototype.print = function () {
        window.print();
    };
    ReportOrdersResultComponent.prototype.$onInit = function () {
        if (this.parent) {
            this.parent.registerResultCtrl(this);
        }
    };
    ReportOrdersResultComponent.prototype.$onDestroy = function () {
    };
    return ReportOrdersResultComponent;
}());
exports.reportOrdersResultComponent = {
    controller: ReportOrdersResultComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    template: "<div class=\"col-sm-12\">\n                <orders-table data=\"vm.orders\" state=\"'Definition'\" show-products=\"vm.settings.showProducts\" ng-if=\"vm.isGroupByOrders\">\n                </orders-table>\n                <monitor-products-table data=\"vm.orders\" state=\"'Definition'\" sort-property=\"+order.supplyDate\" hide-products=\"vm.settings.hideProducts\"\n                    ng-if=\"vm.isGroupByProducts\">\n                </monitor-products-table>\n               </div>"
};
//# sourceMappingURL=report.orders.result.component.js.map
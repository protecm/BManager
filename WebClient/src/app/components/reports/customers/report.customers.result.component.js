"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report_constants_1 = require("../../../constants/report.constants");
var ReportCustomersResultComponent = /** @class */ (function () {
    function ReportCustomersResultComponent() {
    }
    Object.defineProperty(ReportCustomersResultComponent.prototype, "type", {
        get: function () {
            return report_constants_1.ReportConstants.TYPE_CUSTOMERS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportCustomersResultComponent.prototype, "isVisible", {
        get: function () {
            return this.customers && (this.customers.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    ReportCustomersResultComponent.prototype.onDataChange = function (formData) {
        this.customers = formData.data;
    };
    ReportCustomersResultComponent.prototype.print = function () {
        window.print();
    };
    ReportCustomersResultComponent.prototype.$onInit = function () {
        if (this.parent) {
            this.parent.registerResultCtrl(this);
        }
    };
    ReportCustomersResultComponent.prototype.$onDestroy = function () {
    };
    return ReportCustomersResultComponent;
}());
exports.reportCustomersResultComponent = {
    controller: ReportCustomersResultComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    template: "<div class=\"col-sm-12\">\n                <customers-table data=\"vm.customers\">\n                </customers-table>\n               </div>"
};
//# sourceMappingURL=report.customers.result.component.js.map
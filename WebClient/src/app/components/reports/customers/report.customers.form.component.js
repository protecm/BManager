"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report_constants_1 = require("../../../constants/report.constants");
var customer_filter_object_1 = require("../../../objects/customer/customer.filter.object");
var ReportCustomersFormComponent = /** @class */ (function () {
    function ReportCustomersFormComponent(customerService) {
        this.customerService = customerService;
    }
    Object.defineProperty(ReportCustomersFormComponent.prototype, "type", {
        get: function () {
            return report_constants_1.ReportConstants.TYPE_CUSTOMERS;
        },
        enumerable: true,
        configurable: true
    });
    ReportCustomersFormComponent.prototype.generate = function () {
        var _this = this;
        this.isGenerateInProcess = true;
        this.customerName = this.customerName ? this.customerName : '';
        var filter = new customer_filter_object_1.CustomerFilterObject(this.customerName, false);
        return this.getCustomersFromServer(filter)
            .then(function (data) {
            _this.isGenerateInProcess = false;
            return {
                data: data,
                settings: null
            };
        });
    };
    ReportCustomersFormComponent.prototype.getCustomersFromServer = function (filter) {
        return this.customerService.getCustomers(filter);
    };
    ReportCustomersFormComponent.prototype.$onInit = function () {
        if (this.parent) {
            this.parent.registerFormCtrl(this);
        }
    };
    ReportCustomersFormComponent.prototype.$onDestroy = function () {
    };
    return ReportCustomersFormComponent;
}());
exports.reportCustomersFormComponent = {
    controller: ReportCustomersFormComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    templateUrl: 'app/templates/reports/report.customers.form.template.html'
};
//# sourceMappingURL=report.customers.form.component.js.map
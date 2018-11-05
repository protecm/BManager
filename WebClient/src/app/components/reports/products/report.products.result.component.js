"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report_constants_1 = require("../../../constants/report.constants");
var ReportProductsResultComponent = /** @class */ (function () {
    function ReportProductsResultComponent() {
    }
    Object.defineProperty(ReportProductsResultComponent.prototype, "type", {
        get: function () {
            return report_constants_1.ReportConstants.TYPE_PRODUCTS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportProductsResultComponent.prototype, "isVisible", {
        get: function () {
            return this.products && (this.products.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    ReportProductsResultComponent.prototype.onDataChange = function (formData) {
        this.products = formData.data;
    };
    ReportProductsResultComponent.prototype.print = function () {
        window.print();
    };
    ReportProductsResultComponent.prototype.$onInit = function () {
        if (this.parent) {
            this.parent.registerResultCtrl(this);
        }
    };
    ReportProductsResultComponent.prototype.$onDestroy = function () {
    };
    return ReportProductsResultComponent;
}());
exports.reportProductsResultComponent = {
    controller: ReportProductsResultComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    template: "<div class=\"col-sm-12\">\n                <products-table data=\"vm.products\">\n                </products-table>\n               </div>"
};
//# sourceMappingURL=report.products.result.component.js.map
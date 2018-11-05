"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report_constants_1 = require("../../constants/report.constants");
var ReportsHostComponent = /** @class */ (function () {
    function ReportsHostComponent() {
        this.reportTypes = report_constants_1.ReportConstants.TYPE_LIST;
        this.reportsRepo = {};
    }
    ReportsHostComponent.prototype.registerReport = function (report, container) {
        if (report && container) {
            this.reportsRepo[report.code] = container;
        }
    };
    ReportsHostComponent.prototype.print = function () {
        if (this.currSelectedReportType && this.reportsRepo[this.currSelectedReportType.code]) {
            this.reportsRepo[this.currSelectedReportType.code].print();
        }
    };
    ReportsHostComponent.prototype.onReportTypeSelected = function (type) {
        if (this.currSelectedReportType && this.reportsRepo[this.currSelectedReportType.code]) {
            this.reportsRepo[this.currSelectedReportType.code].isVisible = false;
        }
        this.currSelectedReportType = type;
        if (this.currSelectedReportType && this.reportsRepo[this.currSelectedReportType.code]) {
            this.reportsRepo[this.currSelectedReportType.code].isVisible = true;
        }
    };
    return ReportsHostComponent;
}());
exports.reportsHostComponent = {
    controller: ReportsHostComponent,
    controllerAs: 'vm',
    transclude: true,
    templateUrl: 'app/templates/reports/reports.host.template.html'
};
//# sourceMappingURL=reports.host.component.js.map
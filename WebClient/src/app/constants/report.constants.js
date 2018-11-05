"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReportConstants = /** @class */ (function () {
    function ReportConstants() {
    }
    ReportConstants.TYPE_PRODUCTS = {
        code: 0,
        name: 'PRODUCTS'
    };
    ReportConstants.TYPE_CUSTOMERS = {
        code: 1,
        name: 'CUSTOMERS'
    };
    ReportConstants.TYPE_ORDERS = {
        code: 2,
        name: 'ORDERS'
    };
    ReportConstants.TYPE_LIST = [
        ReportConstants.TYPE_PRODUCTS,
        ReportConstants.TYPE_CUSTOMERS,
        ReportConstants.TYPE_ORDERS
    ];
    return ReportConstants;
}());
exports.ReportConstants = ReportConstants;
//# sourceMappingURL=report.constants.js.map
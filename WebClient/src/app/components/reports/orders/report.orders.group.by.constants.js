"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReportOrdersGroupByConstants = /** @class */ (function () {
    function ReportOrdersGroupByConstants() {
    }
    ReportOrdersGroupByConstants.GROUP_BY_ORDERS = {
        id: 1,
        description: 'ORDERS'
    };
    ReportOrdersGroupByConstants.GROUP_BY_PRODUCTS = {
        id: 2,
        description: 'PRODUCTS'
    };
    ReportOrdersGroupByConstants.GROUP_BY_DEFAULT = ReportOrdersGroupByConstants.GROUP_BY_ORDERS;
    ReportOrdersGroupByConstants.GROUP_BY_LIST = [
        ReportOrdersGroupByConstants.GROUP_BY_ORDERS,
        ReportOrdersGroupByConstants.GROUP_BY_PRODUCTS
    ];
    return ReportOrdersGroupByConstants;
}());
exports.ReportOrdersGroupByConstants = ReportOrdersGroupByConstants;
//# sourceMappingURL=report.orders.group.by.constants.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report_constants_1 = require("../../../constants/report.constants");
var customer_filter_object_1 = require("../../../objects/customer/customer.filter.object");
var order_filter_object_1 = require("../../../objects/order/order.filter.object");
var order_constants_1 = require("../../../constants/order.constants");
var date_helper_1 = require("../../../helpers/date.helper");
var product_filter_object_1 = require("../../../objects/product/product.filter.object");
var report_orders_group_by_constants_1 = require("./report.orders.group.by.constants");
//TODO - create base class for component default behavior - onInit... register to parent & IComponent options
var ReportOrdersFormComponent = /** @class */ (function () {
    function ReportOrdersFormComponent(customerService, productService, orderService) {
        this.customerService = customerService;
        this.productService = productService;
        this.orderService = orderService;
        this.getCustomersFromServer();
        this.getProductsFromServer();
        this.orderStatuses = order_constants_1.OrderConstants.STATUS_LIST;
        this.groupByOptions = report_orders_group_by_constants_1.ReportOrdersGroupByConstants.GROUP_BY_LIST;
        this.selectedGroupBy = report_orders_group_by_constants_1.ReportOrdersGroupByConstants.GROUP_BY_DEFAULT;
        this.dateOptions = date_helper_1.DateHelper.GetDefaultDateOptions();
    }
    Object.defineProperty(ReportOrdersFormComponent.prototype, "type", {
        get: function () {
            return report_constants_1.ReportConstants.TYPE_ORDERS;
        },
        enumerable: true,
        configurable: true
    });
    ReportOrdersFormComponent.prototype.generate = function () {
        var _this = this;
        this.isGenerateInProcess = true;
        var filter = order_filter_object_1.OrderFilterObject.Create();
        filter.orderFromDate = this.fromDate ? this.fromDate : null;
        /* Selected dates with bootstrap's 'uib-datepicker' are created with 00:00:00 time,
        to get the orders with the 'toDate' value we will filter with the next day */
        filter.orderToDate = this.toDate ? date_helper_1.DateHelper.GetTomorrowDate(this.toDate) : null;
        filter.customer = this.selectedCustomer;
        filter.product = this.selectedProduct;
        filter.status = this.selectedOrderStatus;
        return this.getOrdersFromServer(filter)
            .then(function (data) {
            _this.isGenerateInProcess = false;
            return {
                data: data,
                settings: {
                    showProducts: _this.showProducts,
                    hideProducts: _this.hideProducts,
                    groupBy: _this.showProducts ? _this.selectedGroupBy : report_orders_group_by_constants_1.ReportOrdersGroupByConstants.GROUP_BY_DEFAULT
                }
            };
        });
    };
    ReportOrdersFormComponent.prototype.getOrdersFromServer = function (filter) {
        return this.orderService.getOrders(filter);
    };
    ReportOrdersFormComponent.prototype.getCustomersFromServer = function () {
        var _this = this;
        this.customerService.getCustomers(customer_filter_object_1.CustomerFilterObject.GetActiveCustomersFilter())
            .then(function (data) {
            _this.customers = data;
        });
    };
    ReportOrdersFormComponent.prototype.getProductsFromServer = function () {
        var _this = this;
        this.productService.getProducts(product_filter_object_1.ProductFilterObject.GetActiveProductsFilter())
            .then(function (data) {
            _this.products = data;
        });
    };
    Object.defineProperty(ReportOrdersFormComponent.prototype, "isGroupByProducts", {
        get: function () {
            return this.selectedGroupBy && (this.selectedGroupBy.id === report_orders_group_by_constants_1.ReportOrdersGroupByConstants.GROUP_BY_PRODUCTS.id);
        },
        enumerable: true,
        configurable: true
    });
    ReportOrdersFormComponent.prototype.$onInit = function () {
        if (this.parent) {
            this.parent.registerFormCtrl(this);
        }
    };
    ReportOrdersFormComponent.prototype.$onDestroy = function () {
    };
    return ReportOrdersFormComponent;
}());
exports.reportOrdersFormComponent = {
    controller: ReportOrdersFormComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    templateUrl: 'app/templates/reports/report.orders.form.template.html'
};
//# sourceMappingURL=report.orders.form.component.js.map
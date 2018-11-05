"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reports_component_1 = require("../components/reports.component");
var report_products_form_component_1 = require("../components/reports/products/report.products.form.component");
var report_customers_form_component_1 = require("../components/reports/customers/report.customers.form.component");
var report_orders_form_component_1 = require("../components/reports/orders/report.orders.form.component");
var reports_host_component_1 = require("../components/reports/reports.host.component");
var report_component_1 = require("../components/reports/report.component");
var report_products_result_component_1 = require("../components/reports/products/report.products.result.component");
var report_customers_result_component_1 = require("../components/reports/customers/report.customers.result.component");
var report_orders_result_component_1 = require("../components/reports/orders/report.orders.result.component");
exports.reportsModule = angular
    .module('reportsModule', [])
    .component('reportsView', reports_component_1.reportsComponent)
    .component('reportsHost', reports_host_component_1.reportsHostComponent)
    .component('report', report_component_1.reportComponent)
    .component('reportProductsForm', report_products_form_component_1.reportProductsFormComponent)
    .component('reportProductsResult', report_products_result_component_1.reportProductsResultComponent)
    .component('reportCustomersForm', report_customers_form_component_1.reportCustomersFormComponent)
    .component('reportCustomersResult', report_customers_result_component_1.reportCustomersResultComponent)
    .component('reportOrdersForm', report_orders_form_component_1.reportOrdersFormComponent)
    .component('reportOrdersResult', report_orders_result_component_1.reportOrdersResultComponent);
//# sourceMappingURL=reports.module.js.map
import {IAngularStatic} from "angular";
import {reportsComponent} from "../components/reports.component";
import {reportProductsFormComponent} from "../components/reports/products/report.products.form.component";
import {reportCustomersFormComponent} from "../components/reports/customers/report.customers.form.component";
import {reportOrdersFormComponent} from "../components/reports/orders/report.orders.form.component";
import {reportsHostComponent} from "../components/reports/reports.host.component";
import {reportComponent} from "../components/reports/report.component";
import {reportProductsResultComponent} from "../components/reports/products/report.products.result.component";
import {reportCustomersResultComponent} from "../components/reports/customers/report.customers.result.component";
import {reportOrdersResultComponent} from "../components/reports/orders/report.orders.result.component";

declare const angular:IAngularStatic;
export const reportsModule = angular
    .module('reportsModule',[])
    .component('reportsView', reportsComponent)
    .component('reportsHost', reportsHostComponent)
    .component('report', reportComponent)
    .component('reportProductsForm', reportProductsFormComponent)
    .component('reportProductsResult', reportProductsResultComponent)
    .component('reportCustomersForm', reportCustomersFormComponent)
    .component('reportCustomersResult', reportCustomersResultComponent)
    .component('reportOrdersForm', reportOrdersFormComponent)
    .component('reportOrdersResult', reportOrdersResultComponent);
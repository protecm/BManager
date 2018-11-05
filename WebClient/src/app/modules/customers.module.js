"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customers_component_1 = require("../components/customers.component");
var customer_service_1 = require("../services/customer.service");
var customers_table_component_1 = require("../components/tables/customers.table.component");
exports.customersModule = angular
    .module('customersModule', [])
    .component('customersTable', customers_table_component_1.customersTableComponent)
    .component('customersView', customers_component_1.customersComponent)
    .service('customerService', customer_service_1.CustomerService);
//# sourceMappingURL=customers.module.js.map
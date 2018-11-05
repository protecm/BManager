"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("../components/app.component");
var header_component_1 = require("../components/header.component");
var login_module_1 = require("./login.module");
var app_config_1 = require("../config/app.config");
var navigation_component_1 = require("../components/navigation.component");
var app_run_1 = require("../config/app.run");
var language_service_1 = require("../services/language.service");
var products_module_1 = require("./products.module");
var orders_module_1 = require("./orders.module");
var customers_module_1 = require("./customers.module");
var monitor_module_1 = require("./monitor.module");
var deliveries_module_1 = require("./deliveries.module");
var home_module_1 = require("./home.module");
var not_found_component_1 = require("../components/common/not.found.component");
var confirmation_service_1 = require("../services/confirmation.service");
var chat_module_1 = require("./chat.module");
var bm_badge_component_1 = require("../components/common/bm.badge.component");
var system_module_1 = require("./system.module");
var reports_module_1 = require("./reports.module");
exports.appModule = angular
    .module('appModule', ['pascalprecht.translate', 'angular.filter', 'ngLodash', 'ui.select', 'ngSanitize', 'toastr', 'cgBusy',
    home_module_1.homeModule.name, login_module_1.loginModule.name, system_module_1.systemModule.name, products_module_1.productsModule.name, customers_module_1.customersModule.name, orders_module_1.ordersModule.name, monitor_module_1.monitorModule.name,
    chat_module_1.chatModule.name, deliveries_module_1.deliveriesModule.name, reports_module_1.reportsModule.name])
    .component('businessApp', app_component_1.appComponent)
    .component('headerView', header_component_1.headerComponent)
    .component('navView', navigation_component_1.navigationComponent)
    .component('notFoundView', not_found_component_1.notFoundComponent)
    .component('bmBadge', bm_badge_component_1.bmBadgeComponent)
    .service('languageService', language_service_1.LanguageService)
    .service('confirmationService', confirmation_service_1.ConfirmationService)
    .config(app_config_1.AppConfig)
    .run(app_run_1.AppRun);
//# sourceMappingURL=app.module.js.map
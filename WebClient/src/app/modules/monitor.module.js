"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var monitor_component_1 = require("../components/monitor/monitor.component");
var monitor_orders_tab_component_1 = require("../components/tabs/monitor/monitor.orders.tab.component");
var monitor_products_tab_component_1 = require("../components/tabs/monitor/monitor.products.tab.component");
var monitor_service_1 = require("../services/monitor.service");
var monitor_status_component_1 = require("../components/monitor/monitor.status.component");
var monitor_progress_component_1 = require("../components/monitor/monitor.progress.component");
var monitor_note_component_1 = require("../components/monitor/monitor.note.component");
var status_component_1 = require("../components/monitor/status.component");
var monitor_products_table_component_1 = require("../components/tables/monitor.products.table.component");
exports.monitorModule = angular
    .module('monitorModule', [])
    .component('monitorProductsTable', monitor_products_table_component_1.monitorProductsTableComponent)
    .component('monitorView', monitor_component_1.monitorComponent)
    .component('monitorOrdersTabView', monitor_orders_tab_component_1.monitorOrdersTabComponent)
    .component('monitorProductsTabView', monitor_products_tab_component_1.monitorProductsTabComponent)
    .component('monitorStatusView', monitor_status_component_1.monitorStatusComponent)
    .component('statusView', status_component_1.statusComponent)
    .component('monitorProgressView', monitor_progress_component_1.monitorProgressComponent)
    .component('monitorNoteView', monitor_note_component_1.monitorNoteComponent)
    .service('monitorService', monitor_service_1.MonitorService);
//# sourceMappingURL=monitor.module.js.map
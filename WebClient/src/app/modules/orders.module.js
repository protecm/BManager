"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var orders_component_1 = require("../components/orders.component");
var order_service_1 = require("../services/order.service");
var order_row_panel_component_1 = require("../components/order.row.panel.component");
var bm_toggle_btn_component_1 = require("../components/common/bm.toggle.btn.component");
var orders_table_component_1 = require("../components/tables/orders.table.component");
var order_rows_table_component_1 = require("../components/tables/order.rows.table.component");
exports.ordersModule = angular
    .module('ordersModule', [])
    .component('ordersTable', orders_table_component_1.ordersTableComponent)
    .component('orderRowsTable', order_rows_table_component_1.orderRowsTableComponent)
    .component('ordersView', orders_component_1.ordersComponent)
    .component('orderRowPanel', order_row_panel_component_1.orderRowPanelComponent)
    .component('bmToggleBtn', bm_toggle_btn_component_1.bmToggleBtnComponent)
    .service('orderService', order_service_1.OrderService);
//# sourceMappingURL=orders.module.js.map
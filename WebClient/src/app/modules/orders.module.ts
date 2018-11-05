import {IAngularStatic} from "angular";
import {ordersComponent} from "../components/orders.component";
import {OrderService} from "../services/order.service";
import {orderRowPanelComponent} from "../components/order.row.panel.component";
import {bmToggleBtnComponent} from "../components/common/bm.toggle.btn.component";
import {ordersTableComponent} from "../components/tables/orders.table.component";
import {orderRowsTableComponent} from "../components/tables/order.rows.table.component";

declare const angular:IAngularStatic;
export const ordersModule = angular
    .module('ordersModule',[])
    .component('ordersTable',ordersTableComponent)
    .component('orderRowsTable',orderRowsTableComponent)
    .component('ordersView',ordersComponent)
    .component('orderRowPanel',orderRowPanelComponent)
    .component('bmToggleBtn',bmToggleBtnComponent)
    .service('orderService',OrderService);
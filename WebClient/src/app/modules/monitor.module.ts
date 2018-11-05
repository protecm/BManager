import {IAngularStatic} from "angular";
import {monitorComponent} from "../components/monitor/monitor.component";
import {monitorOrdersTabComponent} from "../components/tabs/monitor/monitor.orders.tab.component";
import {monitorProductsTabComponent} from "../components/tabs/monitor/monitor.products.tab.component";
import {MonitorService} from "../services/monitor.service";
import {monitorStatusComponent} from "../components/monitor/monitor.status.component";
import {monitorProgressComponent} from "../components/monitor/monitor.progress.component";
import {monitorNoteComponent} from "../components/monitor/monitor.note.component";
import {statusComponent} from "../components/monitor/status.component";
import {monitorProductsTableComponent} from "../components/tables/monitor.products.table.component";

declare const angular:IAngularStatic;
export const monitorModule = angular
    .module('monitorModule',[])
    .component('monitorProductsTable',monitorProductsTableComponent)
    .component('monitorView',monitorComponent)
    .component('monitorOrdersTabView',monitorOrdersTabComponent)
    .component('monitorProductsTabView',monitorProductsTabComponent)
    .component('monitorStatusView',monitorStatusComponent)
    .component('statusView',statusComponent)
    .component('monitorProgressView',monitorProgressComponent)
    .component('monitorNoteView',monitorNoteComponent)
    .service('monitorService',MonitorService);
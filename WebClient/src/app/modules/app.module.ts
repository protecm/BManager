import {IAngularStatic} from "angular";
import {appComponent} from "../components/app.component";
import {headerComponent} from "../components/header.component";
import {loginModule} from "./login.module";
import {AppConfig} from "../config/app.config";
import {navigationComponent} from "../components/navigation.component";
import {AppRun} from "../config/app.run";
import {LanguageService} from "../services/language.service";
import {productsModule} from "./products.module";
import {ordersModule} from "./orders.module";
import {customersModule} from "./customers.module";
import {monitorModule} from "./monitor.module";
import {deliveriesModule} from "./deliveries.module";
import {homeModule} from "./home.module";
import {notFoundComponent} from "../components/common/not.found.component";
import {ConfirmationService} from "../services/confirmation.service";
import {chatModule} from "./chat.module";
import {bmBadgeComponent} from "../components/common/bm.badge.component";
import {systemModule} from "./system.module";
import {reportsModule} from "./reports.module";

declare const angular:IAngularStatic;
export const appModule = angular
    .module('appModule',['pascalprecht.translate', 'angular.filter', 'ngLodash', 'ui.select', 'ngSanitize', 'toastr', 'cgBusy',
        homeModule.name, loginModule.name, systemModule.name, productsModule.name, customersModule.name, ordersModule.name, monitorModule.name,
        chatModule.name, deliveriesModule.name, reportsModule.name])
    .component('businessApp',appComponent)
    .component('headerView',headerComponent)
    .component('navView', navigationComponent)
    .component('notFoundView',notFoundComponent)
    .component('bmBadge',bmBadgeComponent)
    .service('languageService',LanguageService)
    .service('confirmationService',ConfirmationService)
    .config(AppConfig)
    .run(AppRun);
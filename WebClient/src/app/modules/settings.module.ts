import {IAngularStatic} from "angular";
import {settingsTabComponent} from "../components/tabs/system/settings.tab.component";
import {ConfigurationService} from "../services/configuration.service";
import {ToastService} from "../services/toast.service";

declare const angular:IAngularStatic;
export const settingsModule = angular
    .module('settingsModule',[])
    .component('settingsTabView',settingsTabComponent)
    .service('confService', ConfigurationService)
    .service('toastService',ToastService);
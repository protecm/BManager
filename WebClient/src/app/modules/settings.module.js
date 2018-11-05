"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_tab_component_1 = require("../components/tabs/system/settings.tab.component");
var configuration_service_1 = require("../services/configuration.service");
var toast_service_1 = require("../services/toast.service");
exports.settingsModule = angular
    .module('settingsModule', [])
    .component('settingsTabView', settings_tab_component_1.settingsTabComponent)
    .service('confService', configuration_service_1.ConfigurationService)
    .service('toastService', toast_service_1.ToastService);
//# sourceMappingURL=settings.module.js.map
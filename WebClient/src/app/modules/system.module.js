"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var system_component_1 = require("../components/system.component");
var settings_module_1 = require("./settings.module");
var users_module_1 = require("./users.module");
exports.systemModule = angular
    .module('systemModule', ['ui.toggle', settings_module_1.settingsModule.name, users_module_1.usersModule.name])
    .component('systemView', system_component_1.systemComponent);
//# sourceMappingURL=system.module.js.map
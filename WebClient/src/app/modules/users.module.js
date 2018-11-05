"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_tab_component_1 = require("../components/tabs/system/users.tab.component");
var users_service_1 = require("../services/users.service");
var confirm_validate_directive_1 = require("../directives/confirm.validate.directive");
exports.usersModule = angular
    .module('usersModule', [])
    .component('usersTabView', users_tab_component_1.usersTabComponent)
    .directive(confirm_validate_directive_1.confirmValidateDirective.name, confirm_validate_directive_1.confirmValidateDirective.directive)
    .service('usersService', users_service_1.UsersService);
//# sourceMappingURL=users.module.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("../components/login.component");
var login_service_1 = require("../services/login.service");
var communication_service_1 = require("../services/communication.service");
var modal_service_1 = require("../services/modal.service");
var language_service_1 = require("../services/language.service");
var authentication_service_1 = require("../services/authentication.service");
var permissions_service_1 = require("../services/permissions.service");
var restricted_directive_1 = require("../directives/restricted.directive");
exports.loginModule = angular
    .module('loginModule', ['pascalprecht.translate', 'ui.bootstrap', 'angular-ladda', 'utf8-base64'])
    .component('loginView', login_component_1.loginComponent)
    .directive(restricted_directive_1.restrictedDirective.name, restricted_directive_1.restrictedDirective.directive)
    .service('loginService', login_service_1.LoginService)
    .service('communicationService', communication_service_1.CommunicationService)
    .service('authenticationService', authentication_service_1.AuthenticationService)
    .service('modalService', modal_service_1.ModalService)
    .service('languageService', language_service_1.LanguageService)
    .service('permService', permissions_service_1.PermissionsService);
//# sourceMappingURL=login.module.js.map
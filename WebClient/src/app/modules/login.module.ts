import {IAngularStatic} from "angular";
import {loginComponent} from "../components/login.component";
import {LoginService} from "../services/login.service";
import {CommunicationService} from "../services/communication.service";
import {ModalService} from "../services/modal.service";
import {LanguageService} from "../services/language.service";
import {AuthenticationService} from "../services/authentication.service";
import {PermissionsService} from "../services/permissions.service";
import {restrictedDirective} from "../directives/restricted.directive";

declare const angular:IAngularStatic;
export const loginModule = angular
    .module('loginModule',['pascalprecht.translate','ui.bootstrap','angular-ladda','utf8-base64'])
    .component('loginView',loginComponent)
    .directive(restrictedDirective.name,restrictedDirective.directive)
    .service('loginService',LoginService)
    .service('communicationService',CommunicationService)
    .service('authenticationService',AuthenticationService)
    .service('modalService',ModalService)
    .service('languageService', LanguageService)
    .service('permService',PermissionsService);
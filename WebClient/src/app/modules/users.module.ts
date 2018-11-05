import {IAngularStatic} from "angular";
import {usersTabComponent} from "../components/tabs/system/users.tab.component";
import {UsersService} from "../services/users.service";
import {confirmValidateDirective} from "../directives/confirm.validate.directive";

declare const angular:IAngularStatic;
export const usersModule = angular
    .module('usersModule',[])
    .component('usersTabView',usersTabComponent)
    .directive(confirmValidateDirective.name, confirmValidateDirective.directive)
    .service('usersService',UsersService);
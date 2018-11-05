import {IAngularStatic} from "angular";
import {systemComponent} from "../components/system.component";
import {settingsModule} from "./settings.module";
import {usersModule} from "./users.module";

declare const angular:IAngularStatic;
export const systemModule = angular
    .module('systemModule',['ui.toggle', settingsModule.name, usersModule.name])
    .component('systemView',systemComponent);
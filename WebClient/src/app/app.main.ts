import {IAngularStatic} from "angular";
import {appModule} from "./modules/app.module";

declare const angular:IAngularStatic;
angular.bootstrap(document,[
    'ui.router',
    appModule.name
]);
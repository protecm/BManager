import {IComponentOptions} from "angular";

class ReportsComponent  {
    constructor() {
    }
}

export var reportsComponent:IComponentOptions = {
    controller: ReportsComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/reports.template.html'
};
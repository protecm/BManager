import {IComponentOptions} from "angular";
import {TabManagerInterface} from "../interfaces/tab.manager.interface";

class SystemComponent implements TabManagerInterface{

    constructor() {
    }

    public tabSelected(ind:number):void {
        //
    }
}

export var systemComponent:IComponentOptions = {
    controller: SystemComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/system.template.html'
};
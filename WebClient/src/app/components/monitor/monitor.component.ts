import {IComponentOptions} from "angular";
import {MonitorService} from "../../services/monitor.service";
import {CallbackTriggerComponent} from "../../interfaces/callback.service.interface";
import {TabManagerInterface} from "../../interfaces/tab.manager.interface";

class MonitorComponent extends CallbackTriggerComponent implements TabManagerInterface{

    constructor(private monitorService:MonitorService){
        super();
    }

    public tabSelected(ind:number):void {
        this.trigger(this.monitorService,ind);
    }
}

export var monitorComponent:IComponentOptions = {
    controller: MonitorComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/monitor.template.html'
};
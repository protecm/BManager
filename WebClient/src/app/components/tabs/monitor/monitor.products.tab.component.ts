import {IAngularStatic, IComponentController, IComponentOptions} from "angular";
import {MonitorService} from "../../../services/monitor.service";
import {MonitorBaseTabComponent} from "./monitor.base.tab.component";
import {ConfigurationService} from "../../../services/configuration.service";
import {OrderObject} from "../../../objects/order/order.object";

declare const angular:IAngularStatic;

class MonitorProductsTabComponent extends MonitorBaseTabComponent implements IComponentController{
    public orders:OrderObject[];

    constructor(private confService:ConfigurationService,
                monitorService:MonitorService){
        super(monitorService);
        this.getActiveOrdersFromServer();
    }

    private getActiveOrdersFromServer():void {
        if(!this.isGettingOrdersFromServer) {
            this.isGettingOrdersFromServer = true;

            this.cgBusyOrders.promise = this.monitorService.getActiveOrders()
                .then( (data:OrderObject[]) => {
                    this.isGettingOrdersFromServer = false;
                    this.orders = data;
                });
        }
    }

    public $onInit():void {
        this.monitorService.registerTickListener(this.tabIndex, () => {
            this.getActiveOrdersFromServer();
        },this.confService.configurationData.monitorRefreshRateMinutes*60000);
    }

    public $onDestroy():void {
        this.monitorService.stopTickListener(this.tabIndex);
    }
}

export var monitorProductsTabComponent:IComponentOptions = {
    controller: MonitorProductsTabComponent,
    controllerAs: 'vm',
    bindings: {
        tabIndex: '<'
    },
    templateUrl: 'app/templates/tabs/monitor.products.tab.template.html'
};
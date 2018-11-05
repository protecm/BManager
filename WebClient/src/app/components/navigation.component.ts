import {IComponentOptions} from "angular";
import {LoginService} from "../services/login.service";
import {StatisticsService} from "../services/statistics.service";
import {MonitorService} from "../services/monitor.service";
import {DeliveriesService} from "../services/deliveries.service";
import {ConfigurationService} from "../services/configuration.service";

class NavigationComponent {
    public vm:NavigationComponent;

    constructor(private loginService:LoginService,
                private statisticsService:StatisticsService,
                private monitorService:MonitorService,
                private deliveriesService:DeliveriesService,
                private confService:ConfigurationService){
    }

    public get isLoggedIn():boolean {
        return this.loginService.isLoggedIn;
    }

    public get isChatModeOn():boolean {
        return this.confService.configurationData.chatMode;
    }

    public get monitorOrdersCount():number {
        if(this.monitorService.timestamp && this.statisticsService.timestamp &&
            (this.monitorService.timestamp > this.statisticsService.timestamp) ) {
                return this.monitorService.cacheData.monitorOrdersCount;
        }
        if( this.statisticsService.cachedStatistics ) {
            return this.statisticsService.cachedStatistics.countMonitor;
        }
        return 0;
    }

    public get deliveryOrdersCount():number {
        if(this.deliveriesService.timestamp && this.statisticsService.timestamp &&
            (this.deliveriesService.timestamp > this.statisticsService.timestamp) ) {
            return this.deliveriesService.cacheData.deliveryOrdersCount;
        }
        if( this.statisticsService.cachedStatistics ) {
            return this.statisticsService.cachedStatistics.countDeliveries;
        }
        return 0;
    }
}

export var navigationComponent:IComponentOptions = {
    controller: NavigationComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/navigation.template.html'
};
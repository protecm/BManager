import {IComponentOptions} from "angular";
import {StatisticsService} from "../services/statistics.service";
import {StatisticsObject} from "../objects/statistics.object";

class HomeComponent {
    private statisticsData:StatisticsObject;
    public dataMonitor:number[] = [];
    public labelsMonitor:string[] = [];
    public colorsMonitor:string[] = [];

    public dataDeliveries:number[] = [];
    public labelsDeliveries:string[] = [];
    public colorsDeliveries:string[] = [];

    public doughnutMonitorOptions:ChartOptions;
    public doughnutDeliveriesOptions:ChartOptions;

    constructor(private statisticsService:StatisticsService,
                private $translate:angular.translate.ITranslateService) {
        this.loadViewData();
    }

    private loadViewData():void {
        this.doughnutMonitorOptions = this.getDoughnutOptions('MONITOR');
        this.doughnutDeliveriesOptions = this.getDoughnutOptions('DELIVERIES');
        this.getStatisticsFromServer()
            .then( (data:StatisticsObject) => {
                this.statisticsData = data;
                this.translateStatisticsData();
            });
    }

    private getStatisticsFromServer():Promise<StatisticsObject> {
        return this.statisticsService.getStatistics();
    }

    private getDoughnutOptions(title:string):ChartOptions {
        const options:ChartOptions = <ChartOptions>{
            title : {
                display: false,
                text: this.$translate.instant(title)
            },
            legend: {
                display: true
            }
        };
        return options;
    }

    private translateStatisticsData():void {
        if(this.statisticsData) {
            //  TODO - call to functions can be replaced with constants, labels & colors
            //  MONITOR
            this.dataMonitor = this.statisticsData.generalMonitorValues;
            let tmpLabels = this.statisticsData.generalMonitorLabels;
            tmpLabels.forEach( (str,ind,arr) => {
                arr[ind] = this.$translate.instant(str);
            });
            this.labelsMonitor = tmpLabels;
            this.colorsMonitor = this.statisticsData.generalMonitorColors;
            //  DELIVERIES
            this.dataDeliveries = this.statisticsData.generalDeliveriesValues;
            tmpLabels = this.statisticsData.generalDeliveriesLabels;
            tmpLabels.forEach( (str,ind,arr) => {
                arr[ind] = this.$translate.instant(str);
            });
            this.labelsDeliveries = tmpLabels;
            this.colorsDeliveries = this.statisticsData.generalDeliveriesColors;
        }
    }
}

export var homeComponent:IComponentOptions = {
    controller: HomeComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/home.template.html'
};
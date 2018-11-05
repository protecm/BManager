"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HomeComponent = /** @class */ (function () {
    function HomeComponent(statisticsService, $translate) {
        this.statisticsService = statisticsService;
        this.$translate = $translate;
        this.dataMonitor = [];
        this.labelsMonitor = [];
        this.colorsMonitor = [];
        this.dataDeliveries = [];
        this.labelsDeliveries = [];
        this.colorsDeliveries = [];
        this.loadViewData();
    }
    HomeComponent.prototype.loadViewData = function () {
        var _this = this;
        this.doughnutMonitorOptions = this.getDoughnutOptions('MONITOR');
        this.doughnutDeliveriesOptions = this.getDoughnutOptions('DELIVERIES');
        this.getStatisticsFromServer()
            .then(function (data) {
            _this.statisticsData = data;
            _this.translateStatisticsData();
        });
    };
    HomeComponent.prototype.getStatisticsFromServer = function () {
        return this.statisticsService.getStatistics();
    };
    HomeComponent.prototype.getDoughnutOptions = function (title) {
        var options = {
            title: {
                display: false,
                text: this.$translate.instant(title)
            },
            legend: {
                display: true
            }
        };
        return options;
    };
    HomeComponent.prototype.translateStatisticsData = function () {
        var _this = this;
        if (this.statisticsData) {
            //  TODO - call to functions can be replaced with constants, labels & colors
            //  MONITOR
            this.dataMonitor = this.statisticsData.generalMonitorValues;
            var tmpLabels = this.statisticsData.generalMonitorLabels;
            tmpLabels.forEach(function (str, ind, arr) {
                arr[ind] = _this.$translate.instant(str);
            });
            this.labelsMonitor = tmpLabels;
            this.colorsMonitor = this.statisticsData.generalMonitorColors;
            //  DELIVERIES
            this.dataDeliveries = this.statisticsData.generalDeliveriesValues;
            tmpLabels = this.statisticsData.generalDeliveriesLabels;
            tmpLabels.forEach(function (str, ind, arr) {
                arr[ind] = _this.$translate.instant(str);
            });
            this.labelsDeliveries = tmpLabels;
            this.colorsDeliveries = this.statisticsData.generalDeliveriesColors;
        }
    };
    return HomeComponent;
}());
exports.homeComponent = {
    controller: HomeComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/home.template.html'
};
//# sourceMappingURL=home.component.js.map
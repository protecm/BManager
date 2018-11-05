"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(loginService, statisticsService, monitorService, deliveriesService, confService) {
        this.loginService = loginService;
        this.statisticsService = statisticsService;
        this.monitorService = monitorService;
        this.deliveriesService = deliveriesService;
        this.confService = confService;
    }
    Object.defineProperty(NavigationComponent.prototype, "isLoggedIn", {
        get: function () {
            return this.loginService.isLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationComponent.prototype, "isChatModeOn", {
        get: function () {
            return this.confService.configurationData.chatMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationComponent.prototype, "monitorOrdersCount", {
        get: function () {
            if (this.monitorService.timestamp && this.statisticsService.timestamp &&
                (this.monitorService.timestamp > this.statisticsService.timestamp)) {
                return this.monitorService.cacheData.monitorOrdersCount;
            }
            if (this.statisticsService.cachedStatistics) {
                return this.statisticsService.cachedStatistics.countMonitor;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationComponent.prototype, "deliveryOrdersCount", {
        get: function () {
            if (this.deliveriesService.timestamp && this.statisticsService.timestamp &&
                (this.deliveriesService.timestamp > this.statisticsService.timestamp)) {
                return this.deliveriesService.cacheData.deliveryOrdersCount;
            }
            if (this.statisticsService.cachedStatistics) {
                return this.statisticsService.cachedStatistics.countDeliveries;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return NavigationComponent;
}());
exports.navigationComponent = {
    controller: NavigationComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/navigation.template.html'
};
//# sourceMappingURL=navigation.component.js.map
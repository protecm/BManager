"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var monitor_base_tab_component_1 = require("./monitor.base.tab.component");
var MonitorProductsTabComponent = /** @class */ (function (_super) {
    __extends(MonitorProductsTabComponent, _super);
    function MonitorProductsTabComponent(confService, monitorService) {
        var _this = _super.call(this, monitorService) || this;
        _this.confService = confService;
        _this.getActiveOrdersFromServer();
        return _this;
    }
    MonitorProductsTabComponent.prototype.getActiveOrdersFromServer = function () {
        var _this = this;
        if (!this.isGettingOrdersFromServer) {
            this.isGettingOrdersFromServer = true;
            this.cgBusyOrders.promise = this.monitorService.getActiveOrders()
                .then(function (data) {
                _this.isGettingOrdersFromServer = false;
                _this.orders = data;
            });
        }
    };
    MonitorProductsTabComponent.prototype.$onInit = function () {
        var _this = this;
        this.monitorService.registerTickListener(this.tabIndex, function () {
            _this.getActiveOrdersFromServer();
        }, this.confService.configurationData.monitorRefreshRateMinutes * 60000);
    };
    MonitorProductsTabComponent.prototype.$onDestroy = function () {
        this.monitorService.stopTickListener(this.tabIndex);
    };
    return MonitorProductsTabComponent;
}(monitor_base_tab_component_1.MonitorBaseTabComponent));
exports.monitorProductsTabComponent = {
    controller: MonitorProductsTabComponent,
    controllerAs: 'vm',
    bindings: {
        tabIndex: '<'
    },
    templateUrl: 'app/templates/tabs/monitor.products.tab.template.html'
};
//# sourceMappingURL=monitor.products.tab.component.js.map
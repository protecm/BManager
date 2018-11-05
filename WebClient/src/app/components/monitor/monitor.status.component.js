"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MonitorStatusComponent = /** @class */ (function () {
    function MonitorStatusComponent($scope) {
        this.$scope = $scope;
    }
    MonitorStatusComponent.prototype.$onInit = function () {
        var _this = this;
        this.$scope.$watch(function () {
            return _this.monitor.status;
        }, function (newValue, oldValue) {
            _this.monitorStatus = _this.monitor.monitorStatus;
        });
    };
    return MonitorStatusComponent;
}());
exports.monitorStatusComponent = {
    controller: MonitorStatusComponent,
    controllerAs: 'vm',
    bindings: {
        monitor: '<'
    },
    template: "<div class=\"status-container\" ng-class=\"vm.monitorStatus.styleClass\">\n                    <span>\n                        {{ vm.monitorStatus.description | translate }}\n                    </span>\n                </div>"
};
//# sourceMappingURL=monitor.status.component.js.map
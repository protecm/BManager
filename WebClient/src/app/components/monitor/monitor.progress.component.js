"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var monitor_order_row_group_object_1 = require("../../objects/monitor/monitor.order.row.group.object");
var MonitorProgressComponent = /** @class */ (function () {
    function MonitorProgressComponent($scope) {
        this.$scope = $scope;
    }
    MonitorProgressComponent.prototype.$onInit = function () {
        var _this = this;
        //  TODO - Code Review, need to watch values instead of function results! performance issue!
        // MonitorOrderRowObject & OrderObject implement progress interface...
        this.$scope.$watch(function () {
            if (_this.monitor) {
                if (_this.type && _this.type === MonitorProgressComponent.TYPE_DELIVERIES) {
                    return _this.monitor.deliveryProgress();
                }
                //default - production
                return _this.monitor.productionProgress();
            }
            if (_this.monitorGroup)
                return monitor_order_row_group_object_1.MonitorOrderRowGroupObject.CalculateProgress(_this.monitorGroup);
            return 0;
        }, function (newValue, oldValue) {
            _this.progressValue = newValue;
            if (_this.monitor) {
                _this.progressStyleClass = _this.monitor.monitorStatus.styleClass;
            }
            else if (_this.monitorGroup) {
                _this.progressStyleClass = null;
            }
        });
    };
    MonitorProgressComponent.TYPE_PRODUCTION = 'production';
    MonitorProgressComponent.TYPE_DELIVERIES = 'deliveries';
    return MonitorProgressComponent;
}());
exports.monitorProgressComponent = {
    controller: MonitorProgressComponent,
    controllerAs: 'vm',
    bindings: {
        monitor: '<',
        monitorGroup: '<',
        type: '<'
    },
    template: "<div>\n                    <uib-progressbar style=\"margin: 0 3px 10px 3px;\" class=\"progress-striped active\" type=\"{{vm.progressStyleClass}}\" value=\"vm.progressValue\">\n                        {{vm.progressValue}}%\n                    </uib-progressbar>\n                </div>"
};
//# sourceMappingURL=monitor.progress.component.js.map
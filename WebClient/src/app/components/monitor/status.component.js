"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusComponent = /** @class */ (function () {
    function StatusComponent($scope) {
        this.$scope = $scope;
    }
    StatusComponent.prototype.$onInit = function () {
        var _this = this;
        this.$scope.$watch(function () {
            return _this.monitor.status;
        }, function (newValue, oldValue) {
            _this.status = newValue;
        });
    };
    return StatusComponent;
}());
exports.statusComponent = {
    controller: StatusComponent,
    controllerAs: 'vm',
    bindings: {
        monitor: '<'
    },
    template: "<div class=\"status-container\" ng-class=\"vm.status.styleClass\">\n                    <span>\n                        {{ vm.status.description | translate }}\n                    </span>\n                </div>"
};
//# sourceMappingURL=status.component.js.map
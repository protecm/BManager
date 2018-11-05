"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent($scope) {
        this.$scope = $scope;
    }
    NotFoundComponent.prototype.getWrappedValue = function () {
        if (this.value) {
            return "\"" + this.value + "\"";
        }
        return "\"\"";
    };
    NotFoundComponent.prototype.callCallback = function () {
        var _this = this;
        if (this.callback) {
            this.isActionInProgress = true;
            this.callback().then(function (result) {
                _this.isActionInProgress = false;
            });
        }
    };
    NotFoundComponent.prototype.$onInit = function () {
        var _this = this;
        this.$scope.$watch(function () {
            return _this.value;
        }, function (newValue, oldValue) {
            _this.value = newValue;
        });
    };
    return NotFoundComponent;
}());
exports.notFoundComponent = {
    controller: NotFoundComponent,
    controllerAs: 'vm',
    bindings: {
        value: '<',
        msg: '@',
        callback: '&?',
        callbackLabel: '@'
    },
    template: "<div class=\"row\">\n                    <div class=\"col-sm-8\" style=\"text-align: center;font-weight: bold;color: red;\">\n                        <span>\n                            {{vm.getWrappedValue()}} - {{vm.msg | translate}}\n                        </span>\n                    </div>\n                    <div class=\"col-sm-4\">\n                        <button type=\"button\" class=\"btn btn-success btn-block\" ng-click=\"vm.callCallback()\"\n                        ladda=\"vm.isActionInProgress\" data-style=\"expand-left\" data-spinner-size=\"25\">\n                            <span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span>\n                            {{vm.callbackLabel | translate }}\n                        </button>\n                    </div>\n                </div>"
};
//# sourceMappingURL=not.found.component.js.map
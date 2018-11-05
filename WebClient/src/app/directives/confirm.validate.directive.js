"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmValidateDirective = /** @class */ (function () {
    function ConfirmValidateDirective() {
        this.restrict = 'A';
        this.scope = {
            testValue: '<' + exports.confirmValidateDirective.name
        };
        this.require = 'ngModel';
    }
    ConfirmValidateDirective.prototype.link = function (scope, elem, attrs, ngModelCtrl) {
        var _this = this;
        this._scope = scope;
        //Validator is called on each key-down for the current element that the directive attached to,
        // we need the watch for running the validation when the user typing in the testValue field (other element)
        ngModelCtrl.$validators.confirm = this.validate.bind(this);
        this._scope.$watch(function () {
            return _this._scope.testValue;
        }, function (newValue, oldValue) {
            ngModelCtrl.$validate();
        });
    };
    ConfirmValidateDirective.prototype.validate = function (modelValue) {
        return modelValue === this._scope.testValue;
    };
    return ConfirmValidateDirective;
}());
exports.confirmValidateDirective = {
    name: 'confirmValidate',
    directive: function () {
        return new ConfirmValidateDirective();
    },
    $inject: []
};
//# sourceMappingURL=confirm.validate.directive.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorModalComponent = /** @class */ (function () {
    function ErrorModalComponent($uibModalInstance, title, msg) {
        this.$uibModalInstance = $uibModalInstance;
        this.title = title;
        this.msg = msg;
    }
    ErrorModalComponent.prototype.confirm = function () {
        this.$uibModalInstance.close();
    };
    return ErrorModalComponent;
}());
var errorModalComponent = /** @class */ (function () {
    function errorModalComponent(title, msg) {
        this.animation = true;
        this.controller = ErrorModalComponent;
        this.bindToController = true;
        this.controllerAs = 'vm';
        this.templateUrl = 'app/templates/modals/error.modal.template.html';
        this.resolve = {
            title: function () { return title; },
            msg: function () { return msg; }
        };
    }
    return errorModalComponent;
}());
exports.errorModalComponent = errorModalComponent;
//# sourceMappingURL=error.modal.component.js.map
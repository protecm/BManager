"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmModalComponent = /** @class */ (function () {
    function ConfirmModalComponent($uibModalInstance, title, msg) {
        this.$uibModalInstance = $uibModalInstance;
        this.title = title;
        this.msg = msg;
    }
    ConfirmModalComponent.prototype.ok = function () {
        this.$uibModalInstance.close(true);
    };
    ConfirmModalComponent.prototype.cancel = function () {
        this.$uibModalInstance.dismiss();
    };
    return ConfirmModalComponent;
}());
var confirmModalComponent = /** @class */ (function () {
    function confirmModalComponent(title, msg) {
        this.animation = true;
        this.controller = ConfirmModalComponent;
        this.bindToController = true;
        this.controllerAs = 'vm';
        this.templateUrl = 'app/templates/modals/confirm.modal.template.html';
        this.resolve = {
            title: function () { return title; },
            msg: function () { return msg; }
        };
    }
    return confirmModalComponent;
}());
exports.confirmModalComponent = confirmModalComponent;
//# sourceMappingURL=confirm.modal.component.js.map
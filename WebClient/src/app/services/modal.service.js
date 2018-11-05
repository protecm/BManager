"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_modal_component_1 = require("../components/modals/error.modal.component");
var ModalService = /** @class */ (function () {
    function ModalService($uibModal) {
        this.$uibModal = $uibModal;
    }
    ModalService.prototype.showModal = function (options) {
        var modalInstance = this.$uibModal.open(options);
        return modalInstance.result;
    };
    ModalService.prototype.showErrorMessage = function (title, msg) {
        var options = new error_modal_component_1.errorModalComponent(title, msg);
        var modalInstance = this.$uibModal.open(options);
        modalInstance.result
            .then(function (data) {
            //handle result
        }, function (error) {
            //handla error
        });
    };
    return ModalService;
}());
exports.ModalService = ModalService;
//# sourceMappingURL=modal.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var confirm_modal_component_1 = require("../components/modals/confirm.modal.component");
var ConfirmationService = /** @class */ (function () {
    function ConfirmationService(modalService) {
        this.modalService = modalService;
    }
    ConfirmationService.prototype.getDefaultBodyTemplate = function (msg, objName) {
        return [
            msg,
            '<b>',
            objName,
            '</b>'
        ].join('');
    };
    ConfirmationService.prototype.confirm = function (title, msg) {
        var options = new confirm_modal_component_1.confirmModalComponent(title, msg);
        return this.modalService.showModal(options);
    };
    return ConfirmationService;
}());
exports.ConfirmationService = ConfirmationService;
//# sourceMappingURL=confirmation.service.js.map
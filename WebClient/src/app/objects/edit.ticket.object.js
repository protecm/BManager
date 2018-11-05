"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EditTicketObject = /** @class */ (function () {
    function EditTicketObject(orgObject, edtObject, recordHistory) {
        if (recordHistory === void 0) { recordHistory = false; }
        this.orgObject = orgObject;
        this.edtObject = edtObject;
        this.recordHistory = recordHistory;
    }
    /* NetworkObjectInterface */
    EditTicketObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    EditTicketObject.prototype.deserialize = function () {
        return this;
    };
    return EditTicketObject;
}());
exports.EditTicketObject = EditTicketObject;
//# sourceMappingURL=edit.ticket.object.js.map
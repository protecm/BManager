"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UpdateTicket = /** @class */ (function () {
    function UpdateTicket(target, data) {
        this.target = target;
        this.data = data;
    }
    /* NetworkObjectInterface */
    UpdateTicket.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    UpdateTicket.prototype.deserialize = function () {
        return this;
    };
    return UpdateTicket;
}());
exports.UpdateTicket = UpdateTicket;
//# sourceMappingURL=update.ticket.js.map
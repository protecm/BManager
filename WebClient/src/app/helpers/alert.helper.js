"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlertHelper = /** @class */ (function () {
    function AlertHelper() {
        this.alerts = [];
    }
    AlertHelper.prototype.addAlert = function (type, msg, isResolvable) {
        if (isResolvable === void 0) { isResolvable = true; }
        this.alerts.push({
            type: type,
            msg: msg,
            isResolvable: isResolvable
        });
    };
    AlertHelper.prototype.clear = function () {
        this.alerts = [];
    };
    AlertHelper.prototype.closeAlert = function (pos) {
        this.alerts.splice(pos, 1);
    };
    AlertHelper.TYPE_WARNING = 'warning';
    AlertHelper.TYPE_DANGER = 'danger';
    AlertHelper.TYPE_SUCCESS = 'success';
    return AlertHelper;
}());
exports.AlertHelper = AlertHelper;
//# sourceMappingURL=alert.helper.js.map
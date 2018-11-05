"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BusyHelper = /** @class */ (function () {
    function BusyHelper() {
    }
    BusyHelper.GetDefaultBusy = function (message) {
        return {
            promise: undefined,
            message: message,
            backdrop: true,
            templateUrl: 'app/templates/busy.template.html',
            delay: 0,
            minDuration: 500
        };
    };
    return BusyHelper;
}());
exports.BusyHelper = BusyHelper;
//# sourceMappingURL=busy.helper.js.map
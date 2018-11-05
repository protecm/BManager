"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_helper_1 = require("../helpers/alert.helper");
var AlertConstants = /** @class */ (function () {
    function AlertConstants() {
    }
    AlertConstants.ALERT_ORDER_APPROVED = {
        type: alert_helper_1.AlertHelper.TYPE_WARNING,
        msg: 'ORDER_APPROVED_ENABLE_TO_EDIT',
        isResolvable: true
    };
    AlertConstants.ALERT_ORDER_IN_DELIVERIES = {
        type: alert_helper_1.AlertHelper.TYPE_SUCCESS,
        msg: 'ORDER_IN_DELIVERIES_EDIT_DISABLED',
        isResolvable: false
    };
    AlertConstants.ALERT_ORDER_SUPPLIED = {
        type: alert_helper_1.AlertHelper.TYPE_SUCCESS,
        msg: 'ORDER_SUPPLIED_EDIT_DISABLED',
        isResolvable: false
    };
    AlertConstants.ALERT_ORDER_CANCELED = {
        type: alert_helper_1.AlertHelper.TYPE_DANGER,
        msg: 'ORDER_CANCELED_EDIT_DISABLED',
        isResolvable: false
    };
    AlertConstants.ALERT_ORDER_VIEW_MODE = {
        type: alert_helper_1.AlertHelper.TYPE_SUCCESS,
        msg: 'ORDER_VIEW_MODE',
        isResolvable: false
    };
    return AlertConstants;
}());
exports.AlertConstants = AlertConstants;
//# sourceMappingURL=alert.constants.js.map
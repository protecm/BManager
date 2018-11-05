"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigurationObject = /** @class */ (function () {
    function ConfigurationObject(monitorActiveOrderHours, monitorRefreshRateMinutes, deliveriesRefreshRateMinutes, commentsEnforcement, chatMode) {
        this.monitorActiveOrderHours = monitorActiveOrderHours;
        this.monitorRefreshRateMinutes = monitorRefreshRateMinutes;
        this.deliveriesRefreshRateMinutes = deliveriesRefreshRateMinutes;
        this.commentsEnforcement = commentsEnforcement;
        this.chatMode = chatMode;
    }
    ConfigurationObject.FromDto = function (data) {
        var monitorActiveOrderHours = parseInt(data.monitor_active_order_hours);
        var monitorRefreshRateMinutes = parseInt(data.monitor_refresh_rate_minutes);
        var deliveriesRefreshRateMinutes = parseInt(data.deliveries_refresh_rate_minutes);
        var commentsEnforcement = data.comments_enforcement === '1';
        var chatMode = data.chat_mode === '1';
        return new ConfigurationObject(monitorActiveOrderHours, monitorRefreshRateMinutes, deliveriesRefreshRateMinutes, commentsEnforcement, chatMode);
    };
    return ConfigurationObject;
}());
exports.ConfigurationObject = ConfigurationObject;
//# sourceMappingURL=configuration.object.js.map
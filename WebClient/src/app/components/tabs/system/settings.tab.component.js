"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_object_1 = require("../../../objects/configuration.object");
var db_messages_constants_1 = require("../../../constants/db.messages.constants");
var SettingsTabComponent = /** @class */ (function () {
    function SettingsTabComponent(confService, toastService) {
        this.confService = confService;
        this.toastService = toastService;
        this.configurationOrg = this.confService.configurationData;
        this.initView();
    }
    SettingsTabComponent.prototype.initView = function () {
        this.monitorActiveOrderHours = this.configurationOrg.monitorActiveOrderHours;
        this.monitorRefreshRateMinutes = this.configurationOrg.monitorRefreshRateMinutes;
        this.deliveriesRefreshRateMinutes = this.configurationOrg.deliveriesRefreshRateMinutes;
        this.commentsEnforcement = this.configurationOrg.commentsEnforcement;
        this.chatMode = this.configurationOrg.chatMode;
    };
    SettingsTabComponent.prototype.save = function (valid) {
        var _this = this;
        if (valid) {
            this.isSaveInProcess = true;
            var configurationEdtObj = new configuration_object_1.ConfigurationObject(this.monitorActiveOrderHours, this.monitorRefreshRateMinutes, this.deliveriesRefreshRateMinutes, this.commentsEnforcement, this.chatMode);
            this.confService.editConfiguration(this.configurationOrg, configurationEdtObj)
                .then(function (dbMsg) {
                _this.isSaveInProcess = false;
                if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                    _this.toastService.showSuccess('CHANGES_SAVED', 'SETTINGS');
                }
                else {
                    _this.toastService.showError('SAVE_ERROR', 'SAVE');
                }
            });
        }
    };
    return SettingsTabComponent;
}());
exports.settingsTabComponent = {
    controller: SettingsTabComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/tabs/settings.tab.template.html'
};
//# sourceMappingURL=settings.tab.component.js.map
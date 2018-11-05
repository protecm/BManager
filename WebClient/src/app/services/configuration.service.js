"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_object_1 = require("../objects/request.object");
var communication_constants_1 = require("../constants/communication.constants");
var configuration_object_1 = require("../objects/configuration.object");
var edit_ticket_object_1 = require("../objects/edit.ticket.object");
var db_messages_constants_1 = require("../constants/db.messages.constants");
var ConfigurationService = /** @class */ (function () {
    function ConfigurationService(communicationService) {
        this.communicationService = communicationService;
    }
    ConfigurationService.prototype.loadConfiguration = function () {
        var _this = this;
        return this.getConfigurationFromServer()
            .then(function (data) {
            _this._configurationData = data;
            return _this.isReady = true;
        });
    };
    ConfigurationService.prototype.getConfigurationFromServer = function () {
        var _this = this;
        var reqObj = new request_object_1.RequestObject('ConfigurationService:loadConfigurationFromServer');
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_CONFIGURATIONS, reqObj)
            .then(function (srvMsg) {
            //TODO - Refactor server to return class object... no need parsing integers
            return _this.deserialize(srvMsg.dbMsg);
        });
    };
    ConfigurationService.prototype.editConfiguration = function (orgConf, edtConf) {
        var _this = this;
        var ticket = new edit_ticket_object_1.EditTicketObject(orgConf, edtConf);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.EDIT_CONFIGURATIONS, ticket)
            .then(function (srvMsg) {
            if (srvMsg.dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                //Update changes to service
                _this._configurationData = edtConf;
            }
            return srvMsg.dbMsg;
        });
    };
    Object.defineProperty(ConfigurationService.prototype, "configurationData", {
        get: function () {
            return this._configurationData;
        },
        enumerable: true,
        configurable: true
    });
    /* NetworkServiceInterface */
    ConfigurationService.prototype.convert = function (confDto) {
        return configuration_object_1.ConfigurationObject.FromDto(confDto);
    };
    ConfigurationService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    ConfigurationService.prototype.deserializeArray = function (dbMsg) {
        return [];
    };
    ConfigurationService.DEFAULT_MONITOR_ACTIVE_ORDER_HOURS = 24; //Defines how many hours from now the order is active.
    ConfigurationService.DEFAULT_MONITOR_REFRESH_RATE_MINUTES = 1; //Defines the refresh interval of monitor view.
    return ConfigurationService;
}());
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map
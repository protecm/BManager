"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webserver_constants_1 = require("../constants/webserver.constants");
var communication_constants_1 = require("../constants/communication.constants");
var server_message_object_1 = require("../objects/server.message.object");
var CommunicationService = /** @class */ (function () {
    function CommunicationService($http, authenticationService, base64, $state, $location) {
        this.$http = $http;
        this.authenticationService = authenticationService;
        this.base64 = base64;
        this.$state = $state;
        this.$location = $location;
    }
    CommunicationService.prototype.sendRequest = function (url, obj, timeout) {
        var _this = this;
        url = this.processUrl(url);
        var transferData = obj.serialize(this.base64);
        var credentials = this.authenticationService.credentials ? this.authenticationService.credentials.serialize(this.base64) : '';
        return this.$http({
            method: 'POST',
            url: url,
            timeout: timeout,
            data: {
                reqData: transferData,
                credentials: credentials
            }
        }).then(function (response) {
            if (response.data.code === communication_constants_1.CommunicationConstants.CODE_AUTHENTICATION_FAILED) {
                //User Session was terminated -> logout procedure + redirect to login
                _this.$state.go('login');
            }
            return response.data;
        }, function (error) {
            var errMsg = new server_message_object_1.ServerMessageObject(communication_constants_1.CommunicationConstants.CODE_NOT_OK, 'Communication error');
            return errMsg;
        });
    };
    CommunicationService.prototype.processUrl = function (url) {
        if ((this.$location.port() === webserver_constants_1.WebserverConstants.DEBUG_PORT) || webserver_constants_1.WebserverConstants.REDIRECT_ON) {
            return [
                webserver_constants_1.WebserverConstants.SCHEME,
                '://',
                webserver_constants_1.WebserverConstants.HOSTNAME,
                ':',
                webserver_constants_1.WebserverConstants.PORT,
                webserver_constants_1.WebserverConstants.ROOT_PATH,
                url
            ].join('');
        }
        return [
            webserver_constants_1.WebserverConstants.ROOT_PATH,
            url
        ].join('');
    };
    return CommunicationService;
}());
exports.CommunicationService = CommunicationService;
//# sourceMappingURL=communication.service.js.map
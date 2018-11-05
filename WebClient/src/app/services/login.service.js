"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var communication_constants_1 = require("../constants/communication.constants");
var LoginService = /** @class */ (function () {
    function LoginService(communicationService, authenticationService) {
        this.communicationService = communicationService;
        this.authenticationService = authenticationService;
        this._isLoggedIn = false;
    }
    LoginService.prototype.login = function (user) {
        var _this = this;
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.LOGIN, user)
            .then(function (srvMsg) {
            if (srvMsg.code === communication_constants_1.CommunicationConstants.CODE_OK) {
                _this._isLoggedIn = true;
                _this.authenticationService.credentials = _this.authenticationService.convert(srvMsg.data);
                return true;
            }
            return false;
        });
    };
    LoginService.prototype.logout = function () {
        this._isLoggedIn = false;
    };
    Object.defineProperty(LoginService.prototype, "isLoggedIn", {
        get: function () {
            return this._isLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginService.prototype, "user", {
        get: function () {
            return this.authenticationService.user;
        },
        enumerable: true,
        configurable: true
    });
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map
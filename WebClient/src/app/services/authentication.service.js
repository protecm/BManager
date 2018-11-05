"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var credentials_object_1 = require("../objects/credentials.object");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService() {
    }
    Object.defineProperty(AuthenticationService.prototype, "credentials", {
        get: function () {
            return this._credentials;
        },
        set: function (credentials) {
            this._credentials = credentials;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "user", {
        get: function () {
            return this._credentials ? this._credentials.user : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "username", {
        get: function () {
            return (this._credentials && this._credentials.user) ? this._credentials.user.username : '';
        },
        enumerable: true,
        configurable: true
    });
    /* NetworkServiceInterface */
    AuthenticationService.prototype.convert = function (serverCredentials) {
        if (serverCredentials) {
            var clientCredentials = new credentials_object_1.CredentialsObject(serverCredentials.sessionId, serverCredentials.user, serverCredentials.accessToken);
            return clientCredentials.deserialize();
        }
        return null;
    };
    AuthenticationService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    AuthenticationService.prototype.deserializeArray = function (dbMsg) {
        var serverData = dbMsg.data;
        var credentials = [];
        if (serverData) {
            var len = serverData.length;
            for (var i = 0; i < len; i++) {
                var serverCred = serverData[i];
                var clientCred = this.convert(serverCred);
                credentials.push(clientCred);
            }
        }
        return credentials;
    };
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map
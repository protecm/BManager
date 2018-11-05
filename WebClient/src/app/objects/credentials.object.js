"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_object_1 = require("./user/user.object");
var CredentialsObject = /** @class */ (function () {
    function CredentialsObject(sessionId, user, accessToken) {
        this.sessionId = sessionId;
        this.user = user;
        this.accessToken = accessToken;
    }
    /* NetworkObjectInterface */
    CredentialsObject.prototype.serialize = function (base64) {
        var obj = {
            sessionId: this.sessionId,
            user: this.user.getObject(),
            accessToken: this.accessToken
        };
        var dataStr = JSON.stringify(obj);
        return base64.encode(dataStr);
    };
    CredentialsObject.prototype.deserialize = function () {
        this.user = new user_object_1.UserObject(this.user.id, this.user.username, this.user.password, this.user.userAccess, this.user.isDeleted).deserialize();
        return this;
    };
    return CredentialsObject;
}());
exports.CredentialsObject = CredentialsObject;
//# sourceMappingURL=credentials.object.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_access_object_1 = require("./user.access.object");
var UserObject = /** @class */ (function () {
    function UserObject(id, username, password, userAccess, isDeleted) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._userAccess = userAccess ? userAccess : user_access_object_1.UserAccessObject.CreateInstance();
        this.isDeleted = isDeleted;
    }
    Object.defineProperty(UserObject.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserObject.prototype, "username", {
        get: function () {
            return this._username;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserObject.prototype, "password", {
        get: function () {
            return this._password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserObject.prototype, "userAccess", {
        get: function () {
            return this._userAccess;
        },
        enumerable: true,
        configurable: true
    });
    /* NetworkObjectInterface */
    UserObject.prototype.getObject = function () {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            userAccess: this.userAccess.getObject(),
            isDeleted: this.isDeleted
        };
    };
    UserObject.prototype.serialize = function (base64) {
        var obj = this.getObject();
        var dataStr = JSON.stringify(obj);
        return base64.encode(dataStr);
    };
    UserObject.prototype.deserialize = function () {
        this._userAccess = new user_access_object_1.UserAccessObject(this._userAccess.accessHome, this._userAccess.accessProducts, this._userAccess.accessCustomers, this._userAccess.accessOrders, this._userAccess.accessMonitor, this._userAccess.accessDeliveries, this._userAccess.accessReports, this._userAccess.accessSystem).deserialize();
        return this;
    };
    return UserObject;
}());
exports.UserObject = UserObject;
//# sourceMappingURL=user.object.js.map
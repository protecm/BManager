"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserFilterObject = /** @class */ (function () {
    function UserFilterObject(isDeleted) {
        this.isDeleted = isDeleted;
    }
    UserFilterObject.GetActiveUsersFilter = function () {
        return new UserFilterObject(false);
    };
    /* NetworkObjectInterface */
    UserFilterObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    UserFilterObject.prototype.deserialize = function () {
        return this;
    };
    return UserFilterObject;
}());
exports.UserFilterObject = UserFilterObject;
//# sourceMappingURL=user.filter.object.js.map
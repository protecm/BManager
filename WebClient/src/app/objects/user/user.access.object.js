"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var access_level_constants_1 = require("../../constants/access.level.constants");
var UserAccessObject = /** @class */ (function () {
    function UserAccessObject(accessHome, accessProducts, accessCustomers, accessOrders, accessMonitor, accessDeliveries, accessReports, accessSystem) {
        this._accessHome = accessHome;
        this._accessProducts = accessProducts;
        this._accessCustomers = accessCustomers;
        this._accessOrders = accessOrders;
        this._accessMonitor = accessMonitor;
        this._accessDeliveries = accessDeliveries;
        this._accessReports = accessReports;
        this._accessSystem = accessSystem;
    }
    Object.defineProperty(UserAccessObject.prototype, "accessHome", {
        get: function () {
            return this._accessHome;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserAccessObject.prototype, "accessProducts", {
        get: function () {
            return this._accessProducts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserAccessObject.prototype, "accessCustomers", {
        get: function () {
            return this._accessCustomers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserAccessObject.prototype, "accessOrders", {
        get: function () {
            return this._accessOrders;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserAccessObject.prototype, "accessMonitor", {
        get: function () {
            return this._accessMonitor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserAccessObject.prototype, "accessDeliveries", {
        get: function () {
            return this._accessDeliveries;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserAccessObject.prototype, "accessReports", {
        get: function () {
            return this._accessReports;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserAccessObject.prototype, "accessSystem", {
        get: function () {
            return this._accessSystem;
        },
        enumerable: true,
        configurable: true
    });
    UserAccessObject.CreateInstance = function () {
        //TODO - pass user role argument and create instance by role
        return new UserAccessObject(access_level_constants_1.AccessLevelConstants.ACCESS_NONE, access_level_constants_1.AccessLevelConstants.ACCESS_NONE, access_level_constants_1.AccessLevelConstants.ACCESS_NONE, access_level_constants_1.AccessLevelConstants.ACCESS_NONE, access_level_constants_1.AccessLevelConstants.ACCESS_NONE, access_level_constants_1.AccessLevelConstants.ACCESS_NONE, access_level_constants_1.AccessLevelConstants.ACCESS_NONE, access_level_constants_1.AccessLevelConstants.ACCESS_NONE);
    };
    /* NetworkObjectInterface */
    UserAccessObject.prototype.getObject = function () {
        return {
            accessHome: this.accessHome,
            accessProducts: this.accessProducts,
            accessCustomers: this.accessCustomers,
            accessOrders: this.accessOrders,
            accessMonitor: this.accessMonitor,
            accessDeliveries: this.accessDeliveries,
            accessReports: this.accessReports,
            accessSystem: this.accessSystem
        };
    };
    UserAccessObject.prototype.serialize = function (base64) {
        var obj = this.getObject();
        var dataStr = JSON.stringify(obj);
        return base64.encode(dataStr);
    };
    UserAccessObject.prototype.deserialize = function () {
        return this;
    };
    return UserAccessObject;
}());
exports.UserAccessObject = UserAccessObject;
//# sourceMappingURL=user.access.object.js.map
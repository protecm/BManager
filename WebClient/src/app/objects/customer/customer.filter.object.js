"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomerFilterObject = /** @class */ (function () {
    function CustomerFilterObject(name, isDeleted) {
        this.name = name;
        this.isDeleted = isDeleted;
    }
    CustomerFilterObject.GetActiveCustomersFilter = function () {
        return new CustomerFilterObject('', false);
    };
    /* NetworkObjectInterface */
    CustomerFilterObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    CustomerFilterObject.prototype.deserialize = function () {
        return this;
    };
    return CustomerFilterObject;
}());
exports.CustomerFilterObject = CustomerFilterObject;
//# sourceMappingURL=customer.filter.object.js.map
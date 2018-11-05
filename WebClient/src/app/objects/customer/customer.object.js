"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomerObject = /** @class */ (function () {
    function CustomerObject(id, name, phone, isDeleted) {
        this.id = id;
        this.name = name;
        this.phone = phone ? phone : '';
        this.isDeleted = isDeleted;
    }
    CustomerObject.prototype.isEqual = function (customer) {
        return customer && this.id === customer.id;
    };
    /* NetworkObjectInterface */
    CustomerObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    CustomerObject.prototype.deserialize = function () {
        return this;
    };
    return CustomerObject;
}());
exports.CustomerObject = CustomerObject;
//# sourceMappingURL=customer.object.js.map
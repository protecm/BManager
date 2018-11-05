"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductFilterObject = /** @class */ (function () {
    function ProductFilterObject(name, category, isDeleted) {
        this.name = name;
        this.category = category;
        this.isDeleted = isDeleted;
    }
    ProductFilterObject.GetActiveProductsFilter = function () {
        return new ProductFilterObject('', null, false);
    };
    /* NetworkObjectInterface */
    ProductFilterObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    ProductFilterObject.prototype.deserialize = function () {
        return this;
    };
    return ProductFilterObject;
}());
exports.ProductFilterObject = ProductFilterObject;
//# sourceMappingURL=product.filter.object.js.map
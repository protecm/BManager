"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var category_object_1 = require("../category.object");
var ProductObject = /** @class */ (function () {
    function ProductObject(id, category, name, isDeleted) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.isDeleted = isDeleted;
    }
    /* NetworkObjectInterface */
    ProductObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    ProductObject.prototype.deserialize = function () {
        this.category = new category_object_1.CategoryObject(this.category.id, this.category.name, this.category.isDeleted).deserialize();
        return this;
    };
    return ProductObject;
}());
exports.ProductObject = ProductObject;
//# sourceMappingURL=product.object.js.map
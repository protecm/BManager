"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CategoryObject = /** @class */ (function () {
    function CategoryObject(id, name, isDeleted) {
        this.id = id;
        this.name = name;
        this.isDeleted = isDeleted;
    }
    /* NetworkObjectInterface */
    CategoryObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    CategoryObject.prototype.deserialize = function () {
        return this;
    };
    return CategoryObject;
}());
exports.CategoryObject = CategoryObject;
//# sourceMappingURL=category.object.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestObject = /** @class */ (function () {
    function RequestObject(name, data) {
        if (data === void 0) { data = ''; }
        this.name = name;
        this.data = data;
    }
    /* NetworkObjectInterface */
    RequestObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    RequestObject.prototype.deserialize = function () {
        return this;
    };
    return RequestObject;
}());
exports.RequestObject = RequestObject;
//# sourceMappingURL=request.object.js.map
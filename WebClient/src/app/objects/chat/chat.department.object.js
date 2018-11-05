"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatDepartmentObject = /** @class */ (function () {
    function ChatDepartmentObject(id, name) {
        this.id = id;
        this.name = name;
    }
    /* NetworkObjectInterface */
    ChatDepartmentObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    ChatDepartmentObject.prototype.deserialize = function () {
        return this;
    };
    return ChatDepartmentObject;
}());
exports.ChatDepartmentObject = ChatDepartmentObject;
//# sourceMappingURL=chat.department.object.js.map
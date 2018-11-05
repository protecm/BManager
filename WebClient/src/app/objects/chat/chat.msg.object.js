"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chat_department_object_1 = require("./chat.department.object");
var ChatMsgObject = /** @class */ (function () {
    function ChatMsgObject(id, sentOn, source, destination, msg) {
        this.id = id;
        this.sentOn = sentOn;
        this.source = source;
        this.destination = destination;
        this.msg = msg;
    }
    /* NetworkObjectInterface */
    ChatMsgObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    ChatMsgObject.prototype.deserialize = function () {
        //TODO - this.source -> deserialize, currently using interface, if will change to object... make adjustments
        this.sentOn = new Date(this.sentOn + ' UTC');
        this.destination = new chat_department_object_1.ChatDepartmentObject(this.destination.id, this.destination.name);
        return this;
    };
    return ChatMsgObject;
}());
exports.ChatMsgObject = ChatMsgObject;
//# sourceMappingURL=chat.msg.object.js.map
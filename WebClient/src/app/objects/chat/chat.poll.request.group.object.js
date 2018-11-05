"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatPollRequestGroupObject = /** @class */ (function () {
    function ChatPollRequestGroupObject() {
        this.data = [];
    }
    /* NetworkObjectInterface */
    ChatPollRequestGroupObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    ChatPollRequestGroupObject.prototype.deserialize = function () {
        return this;
    };
    return ChatPollRequestGroupObject;
}());
exports.ChatPollRequestGroupObject = ChatPollRequestGroupObject;
//# sourceMappingURL=chat.poll.request.group.object.js.map
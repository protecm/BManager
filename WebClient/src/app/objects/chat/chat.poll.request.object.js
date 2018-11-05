"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatPollRequestObject = /** @class */ (function () {
    function ChatPollRequestObject(department, clientLastMsgID) {
        this.department = department;
        this.clientLastMsgID = clientLastMsgID;
    }
    /* NetworkObjectInterface */
    ChatPollRequestObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    ChatPollRequestObject.prototype.deserialize = function () {
        return this;
    };
    return ChatPollRequestObject;
}());
exports.ChatPollRequestObject = ChatPollRequestObject;
//# sourceMappingURL=chat.poll.request.object.js.map
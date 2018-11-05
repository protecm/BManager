"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatMsgComponent = /** @class */ (function () {
    function ChatMsgComponent() {
    }
    Object.defineProperty(ChatMsgComponent.prototype, "username", {
        get: function () {
            return this.msg.source.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatMsgComponent.prototype, "textMsg", {
        get: function () {
            return this.msg.msg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatMsgComponent.prototype, "isSent", {
        get: function () {
            return this.currUser.id === this.msg.source.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatMsgComponent.prototype, "isReceived", {
        get: function () {
            return this.currUser.id !== this.msg.source.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatMsgComponent.prototype, "isSynced", {
        get: function () {
            return this.msg.id !== null;
        },
        enumerable: true,
        configurable: true
    });
    return ChatMsgComponent;
}());
exports.chatMsgComponent = {
    controller: ChatMsgComponent,
    controllerAs: 'vm',
    bindings: {
        currUser: '<',
        msg: '<'
    },
    template: "<div>\n                   <div class=\"chat-msg\" \n                        ng-class=\"{'chat-msg-sent':vm.isSent,'chat-msg-received':vm.isReceived,'chat-msg-not-synced':!vm.isSynced}\">\n                        <span>\n                            <b>\n                                <small>{{ vm.username}}:</small>\n                            </b>\n                        </span>\n                        <span>\n                            {{ vm.textMsg }}\n                        </span>\n                    </div>\n                </div>"
};
//# sourceMappingURL=chat.msg.component.js.map
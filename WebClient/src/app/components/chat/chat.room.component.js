"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chat_msg_object_1 = require("../../objects/chat/chat.msg.object");
var db_messages_constants_1 = require("../../constants/db.messages.constants");
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(chatService) {
        this.chatService = chatService;
        this._unreadMessagesCount = 0;
        this._isStickyBottom = true; //Default
    }
    Object.defineProperty(ChatRoomComponent.prototype, "roomName", {
        get: function () {
            return this.department.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoomComponent.prototype, "unreadMessagesCount", {
        get: function () {
            return this._unreadMessagesCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoomComponent.prototype, "roomConversation", {
        get: function () {
            return this._roomConversation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoomComponent.prototype, "isConversationLoaded", {
        get: function () {
            return this._isConversationLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoomComponent.prototype, "isStickyBottom", {
        get: function () {
            return this._isStickyBottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoomComponent.prototype, "waitLoadConversation", {
        get: function () {
            return this._waitLoadConversation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoomComponent.prototype, "msgCount", {
        get: function () {
            return this._roomConversation ? this._roomConversation.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatRoomComponent.prototype, "lastMsgID", {
        get: function () {
            var count = this.msgCount;
            if (count > 0) {
                var lastPos = count - 1;
                //Need loop for case that conversation not synced
                while (lastPos >= 0) {
                    if (this._roomConversation[lastPos].id !== null) {
                        return this._roomConversation[lastPos].id;
                    }
                    lastPos--;
                }
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    ChatRoomComponent.prototype.sendMessage = function (source, msg) {
        var _this = this;
        if (this._roomConversation) {
            var currDate = new Date();
            var chatMsg_1 = new chat_msg_object_1.ChatMsgObject(null, currDate, source, this.department, msg);
            this.addMessage(chatMsg_1); //with null id = not synced
            this.chatService.sendMessage(chatMsg_1)
                .then(function (dbMsg) {
                if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                    chatMsg_1.id = dbMsg.data;
                    _this.onMessageSendSuccess();
                }
            });
        }
    };
    ChatRoomComponent.prototype.addMessage = function (chatMsg) {
        this._roomConversation.push(chatMsg);
        this.onMessageAdded();
    };
    ChatRoomComponent.prototype.addMessages = function (data) {
        var _this = this;
        data.forEach(function (chatMsg, ind, arr) {
            _this.addMessage(chatMsg);
        });
    };
    ChatRoomComponent.prototype.loadConversationFromServer = function () {
        var _this = this;
        return this.chatService.getConversation(this.department)
            .then(function (data) {
            _this._roomConversation = data;
            _this._isConversationLoaded = true;
            _this.onLoadConversationComplete();
        });
    };
    ChatRoomComponent.prototype.onSelected = function () {
        if (this.parent) {
            this._unreadMessagesCount = 0;
            this.parent.onSelected(this.roomName);
        }
    };
    ChatRoomComponent.prototype.onLoadConversationComplete = function () {
        //
    };
    ChatRoomComponent.prototype.onMessageSendSuccess = function () {
        //
    };
    ChatRoomComponent.prototype.onMessageAdded = function () {
        if (this.isSelected && this._isStickyBottom) {
            this.scrollToBottom();
        }
        else {
            this._unreadMessagesCount++;
        }
    };
    ChatRoomComponent.prototype.scrollToBottom = function () {
        if (this.parent) {
            this.parent.scrollToBottom(this.roomName);
        }
    };
    ChatRoomComponent.prototype.$onInit = function () {
        this._waitLoadConversation = this.loadConversationFromServer();
        if (this.parent) {
            this.parent.registerRoom(this.roomName, this);
        }
        if (this.isSelected) {
            this.onSelected();
        }
    };
    ChatRoomComponent.prototype.$onDestroy = function () {
    };
    return ChatRoomComponent;
}());
exports.chatRoomComponent = {
    controller: ChatRoomComponent,
    controllerAs: 'vm',
    require: {
        parent: '^chatRooms'
    },
    bindings: {
        isSelected: '<',
        department: '<'
    },
    template: "<div>\n                    <button type=\"button\" class=\"btn btn-default btn-block btn-tab-fix\"\n                            ng-class=\"{ 'chat-room-tab-selected' : vm.isSelected }\"\n                            ng-click=\"vm.onSelected()\">\n                        {{ vm.roomName | translate }}\n                        <bm-badge msg=\"vm.unreadMessagesCount\"></bm-badge>\n                    </button>\n                </div>"
};
//# sourceMappingURL=chat.room.component.js.map
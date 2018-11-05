"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatBoxComponent = /** @class */ (function () {
    function ChatBoxComponent(authenticationService, chatService) {
        this.authenticationService = authenticationService;
        this.chatService = chatService;
        //TODO - code review
        this.getChatRoomsFromServer();
        var currUser = this.authenticationService.user;
        this._source = {
            id: currUser.id,
            name: currUser.username
        };
    }
    Object.defineProperty(ChatBoxComponent.prototype, "currUser", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatBoxComponent.prototype, "isChatOpened", {
        get: function () {
            return this._isChatOpened;
        },
        enumerable: true,
        configurable: true
    });
    ChatBoxComponent.prototype.getChatRoomsFromServer = function () {
        var _this = this;
        this.chatService.getChatRooms()
            .then(function (data) {
            if (data) {
                _this.chatRooms = data;
            }
        });
    };
    Object.defineProperty(ChatBoxComponent.prototype, "handler", {
        get: function () {
            return this._handler;
        },
        enumerable: true,
        configurable: true
    });
    ChatBoxComponent.prototype.registerChatRoomsHandler = function (handler) {
        if (!this._handler) {
            this._handler = handler;
        }
        return false;
    };
    ChatBoxComponent.prototype.toggleVisibility = function () {
        this._isChatOpened = !this._isChatOpened;
        this.onVisibilityStateChange(this._isChatOpened);
    };
    ChatBoxComponent.prototype.sendMessage = function () {
        if (this._handler && this.inputMsg && this.inputMsg.length > 0) {
            this._handler.sendMessage(this._source, this.inputMsg);
        }
    };
    ChatBoxComponent.prototype.onChatInput = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            this.sendMessage();
            this.inputMsg = '';
            $event.preventDefault(); //important for enter key to not appear in textarea
        }
    };
    ChatBoxComponent.prototype.onVisibilityStateChange = function (newState) {
        if (this._handler) {
            this._handler.onVisibilityStateChange(newState);
        }
    };
    return ChatBoxComponent;
}());
exports.chatBoxComponent = {
    controller: ChatBoxComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/chat/chat.box.template.html'
};
//# sourceMappingURL=chat.box.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chat_poll_request_group_object_1 = require("../../objects/chat/chat.poll.request.group.object");
var chat_poll_request_object_1 = require("../../objects/chat/chat.poll.request.object");
var chat_scroll_handler_object_1 = require("../../objects/chat/chat.scroll.handler.object");
var ChatRoomsComponent = /** @class */ (function () {
    function ChatRoomsComponent(chatService, $timeout) {
        this.chatService = chatService;
        this.$timeout = $timeout;
        this.chatRooms = {};
    }
    Object.defineProperty(ChatRoomsComponent.prototype, "currUser", {
        get: function () {
            return this.parent.currUser;
        },
        enumerable: true,
        configurable: true
    });
    ChatRoomsComponent.prototype.loadConversation = function () {
        var _this = this;
        if (this.selectedRoom) {
            this.selectedRoom.waitLoadConversation
                .then(function () {
                _this.chatConversation = _this.selectedRoom.roomConversation;
                _this.onLoadConversationSuccess();
            });
        }
    };
    ChatRoomsComponent.prototype.startPollingUpdates = function () {
        this.isPollingCycleRunning = true;
        this.pollUpdates();
    };
    ChatRoomsComponent.prototype.stopPollingUpdates = function () {
        //TODO - cancel network request - via the chat service (resolve promise of timeout)
        this.isPollingCycleRunning = false;
    };
    ChatRoomsComponent.prototype.pollUpdates = function () {
        var _this = this;
        var roomsPromises = [];
        var groupPoll = new chat_poll_request_group_object_1.ChatPollRequestGroupObject();
        var _loop_1 = function (roomName) {
            if (this_1.chatRooms.hasOwnProperty(roomName)) {
                var chRoom_1 = this_1.chatRooms[roomName];
                var chPromise = chRoom_1.waitLoadConversation
                    .then(function () {
                    groupPoll.data.push(new chat_poll_request_object_1.ChatPollRequestObject(chRoom_1.department, chRoom_1.lastMsgID));
                });
                roomsPromises.push(chPromise);
            }
        };
        var this_1 = this;
        for (var roomName in this.chatRooms) {
            _loop_1(roomName);
        }
        Promise.all(roomsPromises)
            .then(function () {
            _this.chatService.longPoll(groupPoll)
                .then(function (data) {
                _this.onPollResponse(data);
            });
        });
    };
    ChatRoomsComponent.prototype.onPollResponse = function (data) {
        var _this = this;
        if (data) {
            data.forEach(function (chPollResponse, ind, arr) {
                var roomName = chPollResponse.department.name;
                if (_this.chatRooms[roomName]) {
                    _this.chatRooms[roomName].addMessages(chPollResponse.msgs);
                }
            });
        }
        if (this.isPollingCycleRunning) {
            this.pollUpdates();
        }
    };
    ChatRoomsComponent.prototype.sendMessage = function (source, msg) {
        if (this.selectedRoom) {
            this.selectedRoom.sendMessage(source, msg);
        }
    };
    ChatRoomsComponent.prototype.onSelected = function (chatRoom) {
        if (this.selectedRoom) {
            this.selectedRoom.isSelected = false;
        }
        if (this.chatRooms[chatRoom]) {
            this.selectedRoom = this.chatRooms[chatRoom];
            this.selectedRoom.isSelected = true;
        }
        this.loadConversation();
    };
    ChatRoomsComponent.prototype.onLoadConversationSuccess = function () {
        if (this.parent && this.parent.isChatOpened && this.selectedRoom && this.selectedRoom.isStickyBottom) {
            this.scrollToBottom(this.selectedRoom.roomName);
        }
    };
    ChatRoomsComponent.prototype.onVisibilityStateChange = function (newState) {
        if (newState && this.selectedRoom && this.selectedRoom.isStickyBottom) {
            this.scrollToBottom(this.selectedRoom.roomName);
        }
    };
    ChatRoomsComponent.prototype.getChatConversationBoxElement = function () {
        return angular.element(document.querySelector('#divChatConversation'));
    };
    ChatRoomsComponent.prototype.scrollToBottom = function (chatRoom) {
        this.chatScrollHandler.scrollToBottom();
    };
    ChatRoomsComponent.prototype.registerRoom = function (chatRoomName, chatRoom) {
        if (!this.chatRooms[chatRoomName]) {
            this.chatRooms[chatRoomName] = chatRoom;
            return true;
        }
        return false;
    };
    ChatRoomsComponent.prototype.$onInit = function () {
        if (this.parent) {
            this.parent.registerChatRoomsHandler(this);
        }
    };
    ChatRoomsComponent.prototype.$postLink = function () {
        //TODO - code review, investigate hook with component children, notice templateUrl of children issue
        var target = this.getChatConversationBoxElement()[0];
        this.chatScrollHandler = new chat_scroll_handler_object_1.ChatScrollHandlerObject(this.$timeout, target);
        this.startPollingUpdates();
    };
    ChatRoomsComponent.prototype.$onDestroy = function () {
        if (this.chatScrollHandler) {
            this.chatScrollHandler.onDestroy();
        }
        this.stopPollingUpdates();
    };
    return ChatRoomsComponent;
}());
exports.chatRoomsComponent = {
    controller: ChatRoomsComponent,
    controllerAs: 'vm',
    require: {
        parent: '^chatBox'
    },
    transclude: true,
    template: "<div id=\"divChatRooms\" class=\"chat-room-tabs\">\n                    <div ng-transclude style=\"display: table-row;\"></div>\n               </div>\n               <div id=\"divChatConversation\" class=\"chat-room-conversation\">\n                   <chat-msg ng-repeat=\"msg in vm.chatConversation track by $index\" msg=\"msg\" curr-user=\"vm.currUser\">\n                   </chat-msg>\n               </div>"
};
//# sourceMappingURL=chat.rooms.component.js.map
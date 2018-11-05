"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var communication_constants_1 = require("../constants/communication.constants");
var chat_msg_object_1 = require("../objects/chat/chat.msg.object");
var ChatService = /** @class */ (function () {
    function ChatService(communicationService, chatPollService, chatRoomService) {
        this.communicationService = communicationService;
        this.chatPollService = chatPollService;
        this.chatRoomService = chatRoomService;
    }
    ChatService.prototype.sendMessage = function (msg) {
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.SEND_CHAT_MSG, msg)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    ChatService.prototype.getConversation = function (chatDep) {
        var _this = this;
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_CHAT, chatDep)
            .then(function (srvMsg) {
            return _this.deserializeArray(srvMsg.dbMsg);
        });
    };
    ChatService.prototype.getChatRooms = function () {
        return this.chatRoomService.getChatRooms();
    };
    ChatService.prototype.longPoll = function (chatPollReqGroup) {
        return this.chatPollService.longPoll(chatPollReqGroup);
    };
    /* NetworkServiceInterface */
    ChatService.prototype.convert = function (serverChatMsg) {
        if (serverChatMsg) {
            var clientChatMsg = new chat_msg_object_1.ChatMsgObject(serverChatMsg.id, serverChatMsg.sentOn, serverChatMsg.source, serverChatMsg.destination, serverChatMsg.msg);
            return clientChatMsg.deserialize();
        }
        return null;
    };
    ChatService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    ChatService.prototype.deserializeArray = function (dbMsg) {
        var serverData = dbMsg && dbMsg.data;
        var conversation = [];
        if (serverData) {
            var len = serverData.length;
            for (var i = 0; i < len; i++) {
                var serverChatMsg = serverData[i];
                var clientChatMsg = this.convert(serverChatMsg);
                conversation.push(clientChatMsg);
            }
        }
        return conversation;
    };
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map
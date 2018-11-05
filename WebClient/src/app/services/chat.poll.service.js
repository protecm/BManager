"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chat_poll_response_object_1 = require("../objects/chat/chat.poll.response.object");
var communication_constants_1 = require("../constants/communication.constants");
var ChatPollService = /** @class */ (function () {
    function ChatPollService(communicationService) {
        this.communicationService = communicationService;
    }
    //TODO - cancel poll request - promise resolve on communication request
    ChatPollService.prototype.longPoll = function (chatPollReqGroup) {
        var _this = this;
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.POLL_CHAT, chatPollReqGroup)
            .then(function (srvMsg) {
            return _this.deserializeMultiple(srvMsg.dbMsg);
        });
    };
    /* NetworkServiceInterface */
    ChatPollService.prototype.convert = function (serverPollResponse) {
        if (serverPollResponse) {
            var clientPollResponse = new chat_poll_response_object_1.ChatPollResponseObject(serverPollResponse.department, serverPollResponse.msgs);
            //TODO - ChatPollResponseObject - implement deserialize
            return clientPollResponse;
        }
        return null;
    };
    ChatPollService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    ChatPollService.prototype.deserializeArray = function (dbMsg) {
        var serverData = dbMsg && dbMsg.data;
        var pollResponseArr = [];
        if (serverData) {
            var len = serverData.length;
            for (var i = 0; i < len; i++) {
                var serverPollResponse = serverData[i];
                var clientPollResponse = this.convert(serverPollResponse);
                pollResponseArr.push(clientPollResponse);
            }
        }
        return pollResponseArr;
    };
    ChatPollService.prototype.deserializeMultiple = function (dbMsg) {
        var serverData = dbMsg && dbMsg.data;
        var roomUpdates = [];
        if (serverData) {
            var len = serverData.length;
            for (var i = 0; i < len; i++) {
                var serverDbMsg = serverData[i];
                var clientPollResponse = this.deserialize(serverDbMsg);
                roomUpdates.push(clientPollResponse);
            }
        }
        return roomUpdates;
    };
    return ChatPollService;
}());
exports.ChatPollService = ChatPollService;
//# sourceMappingURL=chat.poll.service.js.map
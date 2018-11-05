"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chat_department_object_1 = require("../objects/chat/chat.department.object");
var request_object_1 = require("../objects/request.object");
var communication_constants_1 = require("../constants/communication.constants");
var ChatRoomService = /** @class */ (function () {
    function ChatRoomService(communicationService) {
        this.communicationService = communicationService;
    }
    ChatRoomService.prototype.getChatRooms = function () {
        var _this = this;
        //TODO - return only the chat rooms that the user have permissions to.
        var reqObj = new request_object_1.RequestObject('ChatService:getChatRooms');
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_CHAT_ROOMS, reqObj)
            .then(function (srvMsg) {
            return _this.deserializeArray(srvMsg.dbMsg);
        });
    };
    /* NetworkServiceInterface */
    ChatRoomService.prototype.convert = function (serverDep) {
        if (serverDep) {
            var clientDep = new chat_department_object_1.ChatDepartmentObject(serverDep.id, serverDep.name).deserialize();
            return clientDep;
        }
        return null;
    };
    ChatRoomService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    ChatRoomService.prototype.deserializeArray = function (dbMsg) {
        var serverData = dbMsg && dbMsg.data;
        var chatDeps = [];
        if (serverData) {
            var len = serverData.length;
            for (var i = 0; i < len; i++) {
                var serverDep = serverData[i];
                var clientDep = this.convert(serverDep);
                chatDeps.push(clientDep);
            }
        }
        return chatDeps;
    };
    return ChatRoomService;
}());
exports.ChatRoomService = ChatRoomService;
//# sourceMappingURL=chat.room.service.js.map
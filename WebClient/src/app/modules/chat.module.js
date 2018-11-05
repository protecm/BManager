"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chat_box_component_1 = require("../components/chat/chat.box.component");
var chat_room_component_1 = require("../components/chat/chat.room.component");
var chat_rooms_component_1 = require("../components/chat/chat.rooms.component");
var chat_msg_component_1 = require("../components/chat/chat.msg.component");
var chat_service_1 = require("../services/chat.service");
var chat_poll_service_1 = require("../services/chat.poll.service");
var chat_room_service_1 = require("../services/chat.room.service");
exports.chatModule = angular
    .module('chatModule', [])
    .component('chatBox', chat_box_component_1.chatBoxComponent)
    .component('chatRooms', chat_rooms_component_1.chatRoomsComponent)
    .component('chatRoom', chat_room_component_1.chatRoomComponent)
    .component('chatMsg', chat_msg_component_1.chatMsgComponent)
    .service('chatService', chat_service_1.ChatService)
    .service('chatPollService', chat_poll_service_1.ChatPollService)
    .service('chatRoomService', chat_room_service_1.ChatRoomService);
//# sourceMappingURL=chat.module.js.map
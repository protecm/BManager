import {IAngularStatic} from "angular";
import {chatBoxComponent} from "../components/chat/chat.box.component";
import {chatRoomComponent} from "../components/chat/chat.room.component";
import {chatRoomsComponent} from "../components/chat/chat.rooms.component";
import {chatMsgComponent} from "../components/chat/chat.msg.component";
import {ChatService} from "../services/chat.service";
import {ChatPollService} from "../services/chat.poll.service";
import {ChatRoomService} from "../services/chat.room.service";

declare const angular:IAngularStatic;
export const chatModule = angular
    .module('chatModule',[])
    .component('chatBox',chatBoxComponent)
    .component('chatRooms',chatRoomsComponent)
    .component('chatRoom',chatRoomComponent)
    .component('chatMsg',chatMsgComponent)
    .service('chatService',ChatService)
    .service('chatPollService',ChatPollService)
    .service('chatRoomService',ChatRoomService);
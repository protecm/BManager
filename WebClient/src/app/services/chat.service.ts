import {CommunicationService} from "./communication.service";
import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {CommunicationConstants} from "../constants/communication.constants";
import {ChatMsgObject} from "../objects/chat/chat.msg.object";
import {ChatDepartmentObject} from "../objects/chat/chat.department.object";
import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";
import {ChatPollRequestGroupObject} from "../objects/chat/chat.poll.request.group.object";
import {ChatPollResponseObject} from "../objects/chat/chat.poll.response.object";
import {ChatPollService} from "./chat.poll.service";
import {ChatRoomService} from "./chat.room.service";

export class ChatService implements NetworkServiceInterface<ChatMsgObject,ChatMsgObject>{
    constructor(private communicationService:CommunicationService,
                private chatPollService:ChatPollService,
                private chatRoomService:ChatRoomService) {
    }

    public sendMessage(msg:ChatMsgObject):Promise<DataBaseMessageInterface<any>> {
        return this.communicationService.sendRequest<any>(CommunicationConstants.SEND_CHAT_MSG,msg)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public getConversation(chatDep:ChatDepartmentObject):Promise<ChatMsgObject[]> {
        return this.communicationService.sendRequest<ChatMsgObject[]>(CommunicationConstants.GET_CHAT, chatDep)
            .then((srvMsg:ServerMessageInterface<ChatMsgObject[]>) => {
                return this.deserializeArray(srvMsg.dbMsg);
            });
    }

    public getChatRooms():Promise<ChatDepartmentObject[]> {
        return this.chatRoomService.getChatRooms();
    }

    public longPoll(chatPollReqGroup:ChatPollRequestGroupObject):Promise<ChatPollResponseObject[]> {
        return this.chatPollService.longPoll(chatPollReqGroup);
    }

    /* NetworkServiceInterface */
    convert(serverChatMsg:ChatMsgObject):ChatMsgObject {
        if(serverChatMsg) {
            let clientChatMsg = new ChatMsgObject(serverChatMsg.id, serverChatMsg.sentOn, serverChatMsg.source,
                serverChatMsg.destination, serverChatMsg.msg);
            return clientChatMsg.deserialize();
        }
        return null;
    }

    deserialize(dbMsg:DataBaseMessageInterface<ChatMsgObject>):ChatMsgObject {
        return this.convert(dbMsg.data);
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<ChatMsgObject[]>):ChatMsgObject[] {
        const serverData = dbMsg && dbMsg.data;
        let conversation:ChatMsgObject[] = [];
        if(serverData) {
            const len = serverData.length;
            for(let i=0; i<len; i++) {
                let serverChatMsg = serverData[i];
                let clientChatMsg = this.convert(serverChatMsg);
                conversation.push( clientChatMsg );
            }
        }

        return conversation;
    }
}
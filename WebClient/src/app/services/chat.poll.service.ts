import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {ChatPollResponseObject} from "../objects/chat/chat.poll.response.object";
import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";
import {CommunicationConstants} from "../constants/communication.constants";
import {ChatPollRequestGroupObject} from "../objects/chat/chat.poll.request.group.object";
import {CommunicationService} from "./communication.service";

export class ChatPollService implements NetworkServiceInterface<ChatPollResponseObject,ChatPollResponseObject>{
    constructor(private communicationService:CommunicationService) {
    }

    //TODO - cancel poll request - promise resolve on communication request
    public longPoll(chatPollReqGroup:ChatPollRequestGroupObject):Promise<ChatPollResponseObject[]> {
        return this.communicationService.sendRequest<DataBaseMessageInterface<ChatPollResponseObject>[]>(CommunicationConstants.POLL_CHAT, chatPollReqGroup)
            .then((srvMsg:ServerMessageInterface<DataBaseMessageInterface<ChatPollResponseObject>[]>) => {
                return this.deserializeMultiple(srvMsg.dbMsg);
            });
    }

    /* NetworkServiceInterface */
    convert(serverPollResponse:ChatPollResponseObject):ChatPollResponseObject {
        if(serverPollResponse) {
            let clientPollResponse = new ChatPollResponseObject(serverPollResponse.department, serverPollResponse.msgs);
            //TODO - ChatPollResponseObject - implement deserialize
            return clientPollResponse;
        }
        return null;
    }

    deserialize(dbMsg:DataBaseMessageInterface<ChatPollResponseObject>):ChatPollResponseObject {
        return this.convert(dbMsg.data);
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<ChatPollResponseObject[]>):ChatPollResponseObject[] {
        const serverData = dbMsg && dbMsg.data;
        let pollResponseArr:ChatPollResponseObject[] = [];
        if(serverData) {
            const len = serverData.length;
            for(let i=0; i<len; i++) {
                let serverPollResponse = serverData[i];
                let clientPollResponse = this.convert(serverPollResponse);
                pollResponseArr.push( clientPollResponse );
            }
        }

        return pollResponseArr;
    }

    deserializeMultiple(dbMsg:DataBaseMessageInterface<DataBaseMessageInterface<ChatPollResponseObject>[]>):ChatPollResponseObject[] {
        let serverData:DataBaseMessageInterface<ChatPollResponseObject>[] = dbMsg && dbMsg.data;
        let roomUpdates:ChatPollResponseObject[] = [];

        if(serverData) {
            const len = serverData.length;
            for(let i=0; i<len; i++) {
                let serverDbMsg = serverData[i];
                let clientPollResponse = this.deserialize(serverDbMsg);
                roomUpdates.push(clientPollResponse);
            }
        }
        return roomUpdates;
    }
}
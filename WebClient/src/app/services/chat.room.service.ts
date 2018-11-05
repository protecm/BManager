import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";
import {ChatDepartmentObject} from "../objects/chat/chat.department.object";
import {CommunicationService} from "./communication.service";
import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {RequestObject} from "../objects/request.object";
import {CommunicationConstants} from "../constants/communication.constants";

export class ChatRoomService implements NetworkServiceInterface<ChatDepartmentObject,ChatDepartmentObject>{
    constructor(private communicationService:CommunicationService) {
    }

    public getChatRooms():Promise<ChatDepartmentObject[]> {
        //TODO - return only the chat rooms that the user have permissions to.
        const reqObj = new RequestObject('ChatService:getChatRooms');
        return this.communicationService.sendRequest<ChatDepartmentObject[]>(CommunicationConstants.GET_CHAT_ROOMS,reqObj)
            .then((srvMsg:ServerMessageInterface<ChatDepartmentObject[]>) => {
                return this.deserializeArray(srvMsg.dbMsg);
            });
    }

    /* NetworkServiceInterface */
    convert(serverDep:ChatDepartmentObject):ChatDepartmentObject {
        if(serverDep) {
            let clientDep = new ChatDepartmentObject(serverDep.id, serverDep.name).deserialize();
            return clientDep;
        }
        return null;
    }

    deserialize(dbMsg:DataBaseMessageInterface<ChatDepartmentObject>):ChatDepartmentObject {
        return this.convert(dbMsg.data);
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<ChatDepartmentObject[]>):ChatDepartmentObject[] {
        const serverData = dbMsg && dbMsg.data;
        let chatDeps:ChatDepartmentObject[] = [];
        if(serverData) {
            const len = serverData.length;
            for(let i=0; i<len; i++) {
                let serverDep = serverData[i];
                let clientDep = this.convert(serverDep);
                chatDeps.push( clientDep );
            }
        }

        return chatDeps;
    }
}
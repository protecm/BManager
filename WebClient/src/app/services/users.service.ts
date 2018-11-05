import {CommunicationConstants} from "../constants/communication.constants";
import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {CommunicationService} from "./communication.service";
import {UserObject} from "../objects/user/user.object";
import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";
import {UserFilterObject} from "../objects/user/user.filter.object";
import {EditTicketObject} from "../objects/edit.ticket.object";

export class UsersService implements NetworkServiceInterface<UserObject,UserObject>{

    constructor(private communicationService:CommunicationService){
    }

    public addUser(user:UserObject):Promise<DataBaseMessageInterface<any>> {
        return this.communicationService.sendRequest<any>(CommunicationConstants.ADD_USER,user)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public getUsers(filter:UserFilterObject):Promise<UserObject[]> {
        return this.communicationService.sendRequest<UserObject[]>(CommunicationConstants.GET_USERS,filter)
            .then( (srvMsg:ServerMessageInterface<UserObject[]>) => {
                return this.deserializeArray(srvMsg.dbMsg);
            });
    }

    public deleteUser(user:UserObject):Promise<DataBaseMessageInterface<any>> {
        return this.communicationService.sendRequest<any>(CommunicationConstants.DEL_USER,user)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public editUser(orgUser:UserObject, edtUser:UserObject):Promise<DataBaseMessageInterface<any>> {
        let ticket = new EditTicketObject<Object>(orgUser.getObject(),edtUser.getObject());
        return this.communicationService.sendRequest<any>(CommunicationConstants.EDIT_USER,ticket)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    /* NetworkServiceInterface */
    convert(serverUser:UserObject):UserObject {
        if(serverUser) {
            let clientUser = new UserObject(serverUser.id,serverUser.username,serverUser.password,serverUser.userAccess,serverUser.isDeleted);
            return clientUser.deserialize();
        }
        return null;
    }
    deserialize(dbMsg:DataBaseMessageInterface<UserObject>):UserObject {
        return this.convert(dbMsg.data);
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<UserObject[]>):UserObject[] {
        const serverData = dbMsg.data;
        let users:UserObject[] = [];
        if(serverData) {
            const len = serverData.length;
            for(let i=0; i<len; i++) {
                let serverUser = serverData[i];
                let clientUser = this.convert(serverUser);
                users.push( clientUser );
            }
        }

        return users;
    }
}
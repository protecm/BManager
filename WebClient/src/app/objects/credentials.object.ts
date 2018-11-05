import {NetworkObjectInterface} from "../interfaces/network.object.interface";
import {ServerCredentialsInterface} from "../interfaces/server.message.interface";
import {Base64Interface} from "../interfaces/base64.interface";
import {UserObject} from "./user/user.object";

export class CredentialsObject implements NetworkObjectInterface<CredentialsObject,Object>,ServerCredentialsInterface{

    public sessionId:string;
    public user:UserObject;
    public accessToken:string;

    constructor(sessionId:string, user:UserObject, accessToken:string){
        this.sessionId = sessionId;
        this.user = user;
        this.accessToken = accessToken;
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        const obj = {
            sessionId: this.sessionId,
            user: this.user.getObject(),
            accessToken: this.accessToken
        };
        let dataStr = JSON.stringify(obj);
        return base64.encode(dataStr);
    }

    deserialize():CredentialsObject {
        this.user = new UserObject(this.user.id,this.user.username,this.user.password, this.user.userAccess, this.user.isDeleted).deserialize();
        return this;
    }
}

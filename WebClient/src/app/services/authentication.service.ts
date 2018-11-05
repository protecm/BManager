import {CredentialsObject} from "../objects/credentials.object";
import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";
import {DataBaseMessageInterface, ServerCredentialsInterface} from "../interfaces/server.message.interface";
import {UserObject} from "../objects/user/user.object";

export class AuthenticationService implements NetworkServiceInterface<ServerCredentialsInterface,CredentialsObject>{

    private _credentials:CredentialsObject;

    constructor(){
    }

    public get credentials():CredentialsObject {
        return this._credentials;
    }

    public set credentials(credentials:CredentialsObject) {
        this._credentials = credentials;
    }

    public get user():UserObject {
        return this._credentials ? this._credentials.user:null;
    }

    public get username():string {
        return (this._credentials && this._credentials.user) ? this._credentials.user.username:'';
    }

    /* NetworkServiceInterface */
    convert(serverCredentials:ServerCredentialsInterface):CredentialsObject {
        if(serverCredentials) {
            let clientCredentials = new CredentialsObject(serverCredentials.sessionId,
                serverCredentials.user,serverCredentials.accessToken);
            return clientCredentials.deserialize();
        }
        return null;
    }
    deserialize(dbMsg:DataBaseMessageInterface<ServerCredentialsInterface>):CredentialsObject {
        return this.convert(dbMsg.data);
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<ServerCredentialsInterface[]>):CredentialsObject[] {
        const serverData = dbMsg.data;
        let credentials:CredentialsObject[] = [];
        if(serverData) {
            const len = serverData.length;
            for(let i=0; i<len; i++) {
                let serverCred = serverData[i];
                let clientCred = this.convert(serverCred);
                credentials.push( clientCred );
            }
        }

        return credentials;
    }
}
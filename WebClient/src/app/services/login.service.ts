import {CommunicationService} from "./communication.service";
import {CommunicationConstants} from "../constants/communication.constants";
import {UserObject} from "../objects/user/user.object";
import {ServerCredentialsInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {AuthenticationService} from "./authentication.service";

export class LoginService {

    private _isLoggedIn:boolean;

    constructor(private communicationService:CommunicationService,
                private authenticationService:AuthenticationService) {
        this._isLoggedIn = false;
    }

    public login(user:UserObject):Promise<boolean> {
        return this.communicationService.sendRequest<ServerCredentialsInterface>(CommunicationConstants.LOGIN,user)
            .then( (srvMsg:ServerMessageInterface<ServerCredentialsInterface>) => {
                if( srvMsg.code === CommunicationConstants.CODE_OK ) {
                    this._isLoggedIn = true;
                    this.authenticationService.credentials =  this.authenticationService.convert(srvMsg.data);
                    return true;
                }
                return false;
            });
    }

    public logout():void {
        this._isLoggedIn = false;
    }

    public get isLoggedIn():boolean {
        return this._isLoggedIn;
    }
    
    public get user():UserObject {
        return this.authenticationService.user;
    }
}
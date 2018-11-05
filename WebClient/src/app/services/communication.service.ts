import {IHttpResponse, IHttpService, ILocationService, IPromise} from "angular";
import {WebserverConstants} from "../constants/webserver.constants";
import {NetworkObjectInterface} from "../interfaces/network.object.interface";
import {ServerMessageInterface} from "../interfaces/server.message.interface";
import {CommunicationConstants} from "../constants/communication.constants";
import {ServerMessageObject} from "../objects/server.message.object";
import {AuthenticationService} from "./authentication.service";
import {Base64Interface} from "../interfaces/base64.interface";
import {IStateService} from "angular-ui-router";

export class CommunicationService {
    constructor(private $http:IHttpService,
                private authenticationService:AuthenticationService,
                private base64:Base64Interface,
                private $state:IStateService,
                private $location:ILocationService) {
    }

    public sendRequest<T>(url:string, obj:NetworkObjectInterface<any,any>, timeout?:number|IPromise<any>):Promise<ServerMessageInterface<T>> {
        url = this.processUrl(url);
        const transferData:string = obj.serialize(this.base64);
        const credentials = this.authenticationService.credentials ? this.authenticationService.credentials.serialize(this.base64): '';

        return this.$http({
            method: 'POST',
            url: url,
            timeout: timeout,
            data: {
                reqData: transferData,
                credentials: credentials
            }
        }).then( (response:IHttpResponse<ServerMessageInterface<T>>) => {
            if(response.data.code === CommunicationConstants.CODE_AUTHENTICATION_FAILED) {
                //User Session was terminated -> logout procedure + redirect to login
                this.$state.go('login');
            }
            return response.data;
        }, (error:IHttpResponse<any>) => {
            const errMsg:ServerMessageInterface<T> = new ServerMessageObject(CommunicationConstants.CODE_NOT_OK,'Communication error');
            return errMsg;
        });

    }

    private processUrl(url:string):string {
        if( (this.$location.port() === WebserverConstants.DEBUG_PORT) || WebserverConstants.REDIRECT_ON ) {
            return [
                WebserverConstants.SCHEME,
                '://',
                WebserverConstants.HOSTNAME,
                ':',
                WebserverConstants.PORT,
                WebserverConstants.ROOT_PATH,
                url
            ].join('');
        }
        return [
            WebserverConstants.ROOT_PATH,
            url
        ].join('');
    }
}
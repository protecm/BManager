import {RequestObject} from "../objects/request.object";
import {CommunicationConstants} from "../constants/communication.constants";
import {ConfigurationDtoInterface} from "../interfaces/configuration.dto.interface";
import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {CommunicationService} from "./communication.service";
import {ConfigurationObject} from "../objects/configuration.object";
import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";
import {EditTicketObject} from "../objects/edit.ticket.object";
import {DbMessagesConstants} from "../constants/db.messages.constants";

export class ConfigurationService implements NetworkServiceInterface<ConfigurationDtoInterface,ConfigurationObject>{

    private static readonly DEFAULT_MONITOR_ACTIVE_ORDER_HOURS = 24;    //Defines how many hours from now the order is active.
    private static readonly DEFAULT_MONITOR_REFRESH_RATE_MINUTES = 1;   //Defines the refresh interval of monitor view.
    private isReady:boolean;
    private _configurationData:ConfigurationObject;

    constructor(private communicationService:CommunicationService){

    }

    public loadConfiguration():Promise<boolean> {
        return this.getConfigurationFromServer()
            .then( (data:ConfigurationObject) => {
                this._configurationData = data;
                return this.isReady = true;
            });
    }

    private getConfigurationFromServer():Promise<ConfigurationObject> {
        const reqObj = new RequestObject('ConfigurationService:loadConfigurationFromServer');
        return this.communicationService.sendRequest<ConfigurationDtoInterface>(CommunicationConstants.GET_CONFIGURATIONS,reqObj)
            .then( (srvMsg:ServerMessageInterface<ConfigurationDtoInterface>) => {
                //TODO - Refactor server to return class object... no need parsing integers
                return this.deserialize(srvMsg.dbMsg);
            });
    }

    public editConfiguration(orgConf:ConfigurationObject, edtConf:ConfigurationObject):Promise<DataBaseMessageInterface<any>> {
        let ticket = new EditTicketObject<ConfigurationObject>(orgConf,edtConf);
        return this.communicationService.sendRequest<any>(CommunicationConstants.EDIT_CONFIGURATIONS,ticket)
            .then((srvMsg:ServerMessageInterface<any>) => {
                if (srvMsg.dbMsg.code === DbMessagesConstants.CODE_OK) {
                    //Update changes to service
                    this._configurationData = edtConf;
                }
                return srvMsg.dbMsg;
            });
    }

    public get configurationData():ConfigurationObject {
        return this._configurationData;
    }

    /* NetworkServiceInterface */
    convert(confDto:ConfigurationDtoInterface):ConfigurationObject {
        return ConfigurationObject.FromDto(confDto);
    }
    deserialize(dbMsg:DataBaseMessageInterface<ConfigurationDtoInterface>):ConfigurationObject {
        return this.convert(dbMsg.data)
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<ConfigurationDtoInterface[]>):ConfigurationObject[] {
        return [];
    }
}
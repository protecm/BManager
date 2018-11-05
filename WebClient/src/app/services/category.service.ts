import {CategoryObject} from "../objects/category.object";
import {CommunicationService} from "./communication.service";
import {CommunicationConstants} from "../constants/communication.constants";
import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {RequestObject} from "../objects/request.object";
import {EditTicketObject} from "../objects/edit.ticket.object";
import {CallbackService} from "../interfaces/callback.service.interface";
import {IIntervalService} from "angular";
import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";

export class CategoryService extends CallbackService implements NetworkServiceInterface<CategoryObject,CategoryObject> {
    constructor(private communicationService:CommunicationService,
                $interval:IIntervalService){
        super($interval);
    }

    public addCategory(category:CategoryObject):Promise<DataBaseMessageInterface<any>> {
        return this.communicationService.sendRequest<any>(CommunicationConstants.ADD_CATEGORY,category)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public deleteCategory(category:CategoryObject):Promise<DataBaseMessageInterface<any>> {
        return this.communicationService.sendRequest<any>(CommunicationConstants.DEL_CATEGORY,category)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public editCategory(orgCategory:CategoryObject, edtCategory:CategoryObject):Promise<DataBaseMessageInterface<any>> {
        let ticket = new EditTicketObject<CategoryObject>(orgCategory,edtCategory);
        return this.communicationService.sendRequest<any>(CommunicationConstants.EDIT_CATEGORY,ticket)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public getCategories():Promise<CategoryObject[]> {
        const reqObj = new RequestObject('CategoryService:getCategories');
        return this.communicationService.sendRequest<CategoryObject[]>(CommunicationConstants.GET_CATEGORIES,reqObj)
            .then( (srvMsg:ServerMessageInterface<CategoryObject[]>) => {
                return this.deserializeArray(srvMsg.dbMsg);
            });
    }

    /* NetworkServiceInterface */
    convert(serverCategory:CategoryObject):CategoryObject {
        if(serverCategory) {
            let clientCategory = new CategoryObject(serverCategory.id, serverCategory.name, serverCategory.isDeleted);
            return clientCategory.deserialize();
        }
        return null;
    }
    deserialize(dbMsg:DataBaseMessageInterface<CategoryObject>):CategoryObject {
        return this.convert(dbMsg.data);
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<CategoryObject[]>):CategoryObject[] {
        const serverData = dbMsg.data;
        let categories:CategoryObject[] = [];
        if(serverData) {
            const len = serverData.length;
            for(let i=0; i<len; i++) {
                let serverCategory = serverData[i];
                let clientCategory = this.convert(serverCategory);
                categories.push( clientCategory );
            }
        }

        return categories;
    }
}
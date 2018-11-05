import {CustomerObject} from "../objects/customer/customer.object";
import {RequestObject} from "../objects/request.object";
import {CommunicationService} from "./communication.service";
import {CommunicationConstants} from "../constants/communication.constants";
import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {EditTicketObject} from "../objects/edit.ticket.object";
import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";
import {CustomerFilterObject} from "../objects/customer/customer.filter.object";

export class CustomerService implements NetworkServiceInterface<CustomerObject,CustomerObject> {
    constructor(private communicationService:CommunicationService){
    }

    public addCustomer(customer:CustomerObject):Promise<DataBaseMessageInterface<any>> {
        return this.communicationService.sendRequest<any>(CommunicationConstants.ADD_CUSTOMER,customer)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public deleteCustomer(customer:CustomerObject):Promise<DataBaseMessageInterface<any>> {
        return this.communicationService.sendRequest<any>(CommunicationConstants.DEL_CUSTOMER,customer)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public editCustomer(orgCustomer:CustomerObject, edtCustomer:CustomerObject):Promise<DataBaseMessageInterface<any>> {
        let ticket = new EditTicketObject<CustomerObject>(orgCustomer,edtCustomer);
        return this.communicationService.sendRequest<any>(CommunicationConstants.EDIT_CUSTOMER,ticket)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public getCustomers(filter:CustomerFilterObject):Promise<CustomerObject[]> {
        return this.communicationService.sendRequest<CustomerObject[]>(CommunicationConstants.GET_CUSTOMERS,filter)
            .then( (srvMsg:ServerMessageInterface<CustomerObject[]>) => {
                return this.deserializeArray(srvMsg.dbMsg);
            });
    }

    /* NetworkServiceInterface */
    convert(serverCustomer:CustomerObject):CustomerObject {
        if(serverCustomer) {
            let clientCustomer = new CustomerObject(serverCustomer.id, serverCustomer.name,
                serverCustomer.phone, serverCustomer.isDeleted);
            return clientCustomer.deserialize();
        }
        return null;
    }
    deserialize(dbMsg:DataBaseMessageInterface<CustomerObject>):CustomerObject {
        return this.convert(dbMsg.data);
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<CustomerObject[]>):CustomerObject[] {
        const serverData = dbMsg.data;
        let customers:CustomerObject[] = [];
        if(serverData) {
            const len = serverData.length;
            for(let i=0; i<len; i++) {
                let serverCustomer = serverData[i];
                let clientCustomer = this.convert(serverCustomer);
                customers.push( clientCustomer );
            }
        }

        return customers;
    }
}
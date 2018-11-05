import {CommunicationService} from "./communication.service";
import {ProductObject} from "../objects/product/product.object";
import {RequestObject} from "../objects/request.object";
import {CommunicationConstants} from "../constants/communication.constants";
import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {EditTicketObject} from "../objects/edit.ticket.object";
import {CallbackService} from "../interfaces/callback.service.interface";
import {IIntervalService} from "angular";
import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";
import {ProductFilterObject} from "../objects/product/product.filter.object";

export class ProductService extends CallbackService implements NetworkServiceInterface<ProductObject,ProductObject>{
    constructor(private communicationService:CommunicationService,
                $interval:IIntervalService){
        super($interval);
    }

    public addProduct(product:ProductObject):Promise<DataBaseMessageInterface<any>> {
        return this.communicationService.sendRequest<any>(CommunicationConstants.ADD_PRODUCT,product)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public deleteProduct(product:ProductObject):Promise<DataBaseMessageInterface<any>> {
        return this.communicationService.sendRequest<any>(CommunicationConstants.DEL_PRODUCT,product)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public editProduct(orgProduct:ProductObject, edtProduct:ProductObject):Promise<DataBaseMessageInterface<any>> {
        let ticket = new EditTicketObject<ProductObject>(orgProduct,edtProduct);
        return this.communicationService.sendRequest<any>(CommunicationConstants.EDIT_PRODUCT,ticket)
            .then((srvMsg:ServerMessageInterface<any>) => {
                return srvMsg.dbMsg;
            });
    }

    public getProducts(filter:ProductFilterObject):Promise<ProductObject[]> {
        return this.communicationService.sendRequest<ProductObject[]>(CommunicationConstants.GET_PRODUCTS,filter)
            .then( (srvMsg:ServerMessageInterface<ProductObject[]>) => {
                return this.deserializeArray(srvMsg.dbMsg);
            });
    }

    /* NetworkServiceInterface */
    convert(serverProduct:ProductObject):ProductObject {
        if(serverProduct) {
            let clientProduct = new ProductObject(serverProduct.id, serverProduct.category,
                serverProduct.name, serverProduct.isDeleted);
            return clientProduct.deserialize();
        }
        return null;
    }
    deserialize(dbMsg:DataBaseMessageInterface<ProductObject>):ProductObject {
        return this.convert(dbMsg.data);
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<ProductObject[]>):ProductObject[] {
        const serverData = dbMsg.data;
        let products:ProductObject[] = [];
        if(serverData) {
            const len = serverData.length;
            for(let i=0; i<len; i++) {
                let serverProduct = serverData[i];
                let clientProduct = this.convert(serverProduct);
                products.push( clientProduct );
            }
        }

        return products;
    }
}
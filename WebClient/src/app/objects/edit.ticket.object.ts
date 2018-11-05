import {NetworkObjectInterface} from "../interfaces/network.object.interface";
import {Base64Interface} from "../interfaces/base64.interface";

export class EditTicketObject<T> implements NetworkObjectInterface<EditTicketObject<T>,Object>{

    public orgObject:T;
    public edtObject:T;
    public recordHistory:boolean;   //Flag used to tell the web server to save orgObject in history.

    constructor(orgObject:T, edtObject:T, recordHistory:boolean = false){
        this.orgObject = orgObject;
        this.edtObject = edtObject;
        this.recordHistory = recordHistory;
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():EditTicketObject<T> {
        return this;
    }
}

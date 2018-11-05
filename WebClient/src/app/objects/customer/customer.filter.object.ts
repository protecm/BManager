import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";

export class CustomerFilterObject implements NetworkObjectInterface<CustomerFilterObject,Object> {

    //  Filter parameters
    public name:string;
    public isDeleted:boolean;

    constructor(name:string, isDeleted:boolean) {
        this.name = name;
        this.isDeleted = isDeleted;
    }

    public static GetActiveCustomersFilter():CustomerFilterObject {
        return new CustomerFilterObject('',false);
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():CustomerFilterObject {
        return this;
    }
}
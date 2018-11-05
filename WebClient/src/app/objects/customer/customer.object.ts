import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";

export class CustomerObject implements NetworkObjectInterface<CustomerObject,Object>{

    public id:number;
    public name:string;
    public phone:string;
    public isDeleted:boolean;

    constructor(id:number, name:string, phone:string, isDeleted:boolean){
        this.id = id;
        this.name = name;
        this.phone = phone?phone:'';
        this.isDeleted = isDeleted;
    }

    public isEqual(customer:CustomerObject):boolean {
        return customer && this.id === customer.id;
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():CustomerObject {
        return this;
    }
}
import {NetworkObjectInterface} from "../interfaces/network.object.interface";
import {Base64Interface} from "../interfaces/base64.interface";

export class RequestObject implements NetworkObjectInterface<RequestObject,Object> {

    private name:string;
    private data:any;

    constructor(name:string, data:any = ''){
        this.name = name;
        this.data = data;
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():RequestObject {
        return this;
    }
}
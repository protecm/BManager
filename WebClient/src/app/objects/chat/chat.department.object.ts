import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";

export interface ChatDepartmentInterface {
    id:number;
    name:string;
}

export class ChatDepartmentObject implements ChatDepartmentInterface, NetworkObjectInterface<ChatDepartmentObject,Object>{
    public id:number;
    public name:string;

    constructor(id:number, name:string) {
        this.id = id;
        this.name = name;
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():ChatDepartmentObject {
        return this;
    }
}
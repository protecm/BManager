import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";
import {ChatDepartmentObject} from "./chat.department.object";

export interface ChatUserInterface {
    id:number;
    name:string;
}

export class ChatMsgObject implements NetworkObjectInterface<ChatMsgObject,Object>{

    public id:number;
    public sentOn:Date;
    public source:ChatUserInterface;
    public destination:ChatDepartmentObject;
    public msg:string;

    constructor(id:number,sentOn:Date,source:ChatUserInterface,
                destination:ChatDepartmentObject, msg:string) {
        this.id = id;
        this.sentOn = sentOn;
        this.source = source;
        this.destination = destination;
        this.msg = msg;
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():ChatMsgObject {
        //TODO - this.source -> deserialize, currently using interface, if will change to object... make adjustments
        this.sentOn = new Date(this.sentOn + ' UTC');
        this.destination = new ChatDepartmentObject(this.destination.id, this.destination.name);

        return this;
    }
}
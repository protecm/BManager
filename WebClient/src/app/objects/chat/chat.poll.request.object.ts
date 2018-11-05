import {ChatDepartmentObject} from "./chat.department.object";
import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";

export class ChatPollRequestObject implements NetworkObjectInterface<ChatPollRequestObject,Object> {

    public department:ChatDepartmentObject;
    public clientLastMsgID:number;

    constructor(department:ChatDepartmentObject, clientLastMsgID:number) {
        this.department = department;
        this.clientLastMsgID = clientLastMsgID;
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():ChatPollRequestObject {
        return this;
    }
}
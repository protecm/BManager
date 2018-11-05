import {ChatPollRequestObject} from "./chat.poll.request.object";
import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";

export class ChatPollRequestGroupObject implements NetworkObjectInterface<ChatPollRequestGroupObject,Object>{

    public data:ChatPollRequestObject[];

    constructor() {
        this.data = [];
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():ChatPollRequestGroupObject {
        return this;
    }
}
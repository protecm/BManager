import {NetworkObjectInterface} from "../interfaces/network.object.interface";
import {Base64Interface} from "../interfaces/base64.interface";

export class UpdateTicket<T,K> implements NetworkObjectInterface<UpdateTicket<T,K>,Object> {

    public target:T;
    public data:K;

    constructor(target:T, data:K) {
        this.target = target;
        this.data = data;
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():UpdateTicket<T,K> {
        return this;
    }
}
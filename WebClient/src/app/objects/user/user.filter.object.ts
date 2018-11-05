import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";

export class UserFilterObject implements NetworkObjectInterface<UserFilterObject,Object>{

    //  Filter parameters
    public isDeleted:boolean;

    constructor(isDeleted:boolean) {
        this.isDeleted = isDeleted;
    }

    public static GetActiveUsersFilter():UserFilterObject {
        return new UserFilterObject(false);
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():UserFilterObject {
        return this;
    }
}
import {NetworkObjectInterface} from "../interfaces/network.object.interface";
import {Base64Interface} from "../interfaces/base64.interface";

export class CategoryObject implements NetworkObjectInterface<CategoryObject,Object>{
    public id:number;
    public name:string;
    public isDeleted:boolean;

    constructor(id:number,name:string,isDeleted:boolean){
        this.id = id;
        this.name = name;
        this.isDeleted = isDeleted;
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():CategoryObject {
        return this;
    }
}
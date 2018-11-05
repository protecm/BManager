import {CategoryObject} from "../category.object";
import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";

export class ProductObject implements NetworkObjectInterface<ProductObject,Object>{

    public id:number;
    public category:CategoryObject;
    public name:string;
    public isDeleted:boolean;

    constructor(id:number,category:CategoryObject,name:string,isDeleted:boolean){
        this.id = id;
        this.category = category;
        this.name = name;
        this.isDeleted = isDeleted;
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():ProductObject {
        this.category = new CategoryObject(this.category.id, this.category.name, this.category.isDeleted).deserialize();
        return this;
    }
}

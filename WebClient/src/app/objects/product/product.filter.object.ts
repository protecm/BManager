import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";
import {CategoryObject} from "../category.object";

export class ProductFilterObject implements NetworkObjectInterface<ProductFilterObject,Object> {

    //  Filter parameters
    public name:string;
    public category:CategoryObject;
    public isDeleted:boolean;

    constructor(name:string, category:CategoryObject, isDeleted:boolean) {
        this.name = name;
        this.category = category;
        this.isDeleted = isDeleted;
    }

    public static GetActiveProductsFilter():ProductFilterObject {
        return new ProductFilterObject('', null, false);
    }

    /* NetworkObjectInterface */
    serialize(base64:Base64Interface): string {
        let dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    }

    deserialize():ProductFilterObject {
        return this;
    }
}
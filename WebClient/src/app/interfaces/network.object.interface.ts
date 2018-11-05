import {Base64Interface} from "./base64.interface";

export interface NetworkObjectInterface<T,K> {
    getObject?():K;                        //For cases of getters & privates (not serialized to json),good example - UserObject
    serialize(base64:Base64Interface):string;   //to DTO
    deserialize():T;    //parse values to correct type/object
}
import {DataBaseMessageInterface} from "./server.message.interface";

export interface NetworkServiceInterface<K,T> {
    convert(serverObj:K):T;
    deserialize(dbMsg:DataBaseMessageInterface<K>):T;
    deserializeArray(dbMsg:DataBaseMessageInterface<K[]>):T[];
    //For the case that dbMsg data contains multiple dbMsgs
    deserializeMultiple?(dbMsg:DataBaseMessageInterface<DataBaseMessageInterface<K>[]>):T[];
}
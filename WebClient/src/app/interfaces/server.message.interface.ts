import {UserObject} from "../objects/user/user.object";

//TODO - extend generic 2 types, 1 for server msg type the other for dbMsg type
export interface ServerMessageInterface<T>{
    code:number;
    msg:string;
    extraInfo:string;
    data:T;
    dbMsg:DataBaseMessageInterface<T>;
}

export interface ServerCredentialsInterface {
    sessionId:string;
    user:UserObject;
    accessToken:string;
}

export interface DataBaseMessageInterface<T> {
    code:number;
    msg:string;
    data:T;
}
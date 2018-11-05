import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";

export class ServerMessageObject implements ServerMessageInterface<any> {
    public code: number;
    public msg: string;
    public extraInfo: string;
    public data:any;
    public dbMsg:DataBaseMessageInterface<any>;

    constructor(code: number, msg: string = '', extraInfo: string = '', data:any = {}, dbMsg:any = {} ) {
        this.code = code;
        this.msg = msg;
        this.extraInfo = extraInfo;
        this.data = data;
        this.dbMsg = dbMsg;
    }
}
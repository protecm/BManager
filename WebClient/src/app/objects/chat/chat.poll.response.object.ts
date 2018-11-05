import {ChatDepartmentObject} from "./chat.department.object";
import {ChatMsgObject} from "./chat.msg.object";

export class ChatPollResponseObject {

    public department:ChatDepartmentObject;
    public msgs:ChatMsgObject[];

    constructor(department:ChatDepartmentObject, msgs:ChatMsgObject[]) {
        this.department = department;
        this.msgs = msgs;
    }
}
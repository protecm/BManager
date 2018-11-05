import {ChatDepartmentObject} from "../objects/chat/chat.department.object";

export class ChatConstants {
    public static readonly DEPARTMENT_MANAGEMENT = new ChatDepartmentObject(1,'MANAGEMENT');
    public static readonly DEPARTMENT_ORDERS = new ChatDepartmentObject(2,'ORDERS');
    public static readonly DEPARTMENT_MONITOR = new ChatDepartmentObject(3,'MONITOR');
    public static readonly DEPARTMENT_DELIVERIES = new ChatDepartmentObject(4,'DELIVERIES');

    public static readonly DEPARTMENTS:{ [key:string]:ChatDepartmentObject } = {
        MANAGEMENT: ChatConstants.DEPARTMENT_MANAGEMENT,
        ORDERS: ChatConstants.DEPARTMENT_ORDERS,
        MONITOR: ChatConstants.DEPARTMENT_MONITOR,
        DELIVERIES: ChatConstants.DEPARTMENT_DELIVERIES
    };
}
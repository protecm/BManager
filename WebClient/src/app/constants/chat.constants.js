"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chat_department_object_1 = require("../objects/chat/chat.department.object");
var ChatConstants = /** @class */ (function () {
    function ChatConstants() {
    }
    ChatConstants.DEPARTMENT_MANAGEMENT = new chat_department_object_1.ChatDepartmentObject(1, 'MANAGEMENT');
    ChatConstants.DEPARTMENT_ORDERS = new chat_department_object_1.ChatDepartmentObject(2, 'ORDERS');
    ChatConstants.DEPARTMENT_MONITOR = new chat_department_object_1.ChatDepartmentObject(3, 'MONITOR');
    ChatConstants.DEPARTMENT_DELIVERIES = new chat_department_object_1.ChatDepartmentObject(4, 'DELIVERIES');
    ChatConstants.DEPARTMENTS = {
        MANAGEMENT: ChatConstants.DEPARTMENT_MANAGEMENT,
        ORDERS: ChatConstants.DEPARTMENT_ORDERS,
        MONITOR: ChatConstants.DEPARTMENT_MONITOR,
        DELIVERIES: ChatConstants.DEPARTMENT_DELIVERIES
    };
    return ChatConstants;
}());
exports.ChatConstants = ChatConstants;
//# sourceMappingURL=chat.constants.js.map
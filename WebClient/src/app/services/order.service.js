"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_object_1 = require("../objects/order/order.object");
var communication_constants_1 = require("../constants/communication.constants");
var edit_ticket_object_1 = require("../objects/edit.ticket.object");
var update_ticket_1 = require("../objects/update.ticket");
var request_object_1 = require("../objects/request.object");
var OrderService = /** @class */ (function () {
    function OrderService(communicationService, productService) {
        this.communicationService = communicationService;
        this.productService = productService;
    }
    OrderService.prototype.addOrder = function (order) {
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.ADD_ORDER, order)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    OrderService.prototype.editOrder = function (orgOrder, edtOrder, recordHistory) {
        if (recordHistory === void 0) { recordHistory = false; }
        var ticket = new edit_ticket_object_1.EditTicketObject(orgOrder, edtOrder, recordHistory);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.EDIT_ORDER, ticket)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    OrderService.prototype.updateOrderStatus = function (order, newStatus) {
        var ticket = new update_ticket_1.UpdateTicket(order, newStatus);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.UPDATE_ORDER_STATUS, ticket)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    OrderService.prototype.updateOrderRowStatus = function (orderRow, newStatus) {
        var ticket = new update_ticket_1.UpdateTicket(orderRow, newStatus);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.UPDATE_ORDER_ROW_STATUS, ticket)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    OrderService.prototype.updateOrderNote = function (order, newNote) {
        var ticket = new update_ticket_1.UpdateTicket(order, newNote);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.UPDATE_ORDER_NOTE, ticket)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    OrderService.prototype.updateOrderRowNote = function (orderRow, newNote) {
        var ticket = new update_ticket_1.UpdateTicket(orderRow, newNote);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.UPDATE_ORDER_ROW_NOTE, ticket)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    OrderService.prototype.getOrders = function (filter) {
        var _this = this;
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_ORDERS, filter)
            .then(function (srvMsg) {
            return _this.deserializeArray(srvMsg.dbMsg);
        });
    };
    OrderService.prototype.getCommonProducts = function (limit) {
        var _this = this;
        if (limit === void 0) { limit = 5; }
        var reqObj = new request_object_1.RequestObject('OrderService:getCommonProducts', limit);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_COMMON_PRODUCTS, reqObj)
            .then(function (srvMsg) {
            return _this.productService.deserializeArray(srvMsg.dbMsg);
        });
    };
    OrderService.prototype.getPreviousOrderVersion = function (order) {
        var _this = this;
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_PREVIOUS_ORDER_VERSION, order)
            .then(function (srvMsg) {
            return _this.deserialize(srvMsg.dbMsg);
        });
    };
    /* NetworkServiceInterface */
    OrderService.prototype.convert = function (serverOrder) {
        if (serverOrder) {
            var clientOrder = new order_object_1.OrderObject(serverOrder.id, serverOrder.version, serverOrder.customer, serverOrder.orderDate, serverOrder.supplyDate, serverOrder.notes, serverOrder.orderRows, serverOrder.status);
            return clientOrder.deserialize();
        }
        return null;
    };
    OrderService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    OrderService.prototype.deserializeArray = function (dbMsg) {
        var serverData = dbMsg.data;
        var orders = [];
        if (serverData) {
            var len = serverData.length;
            for (var i = 0; i < len; i++) {
                var serverOrder = serverData[i];
                var clientOrder = this.convert(serverOrder);
                orders.push(clientOrder);
            }
        }
        return orders;
    };
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map
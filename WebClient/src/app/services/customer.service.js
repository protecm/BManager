"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_object_1 = require("../objects/customer/customer.object");
var communication_constants_1 = require("../constants/communication.constants");
var edit_ticket_object_1 = require("../objects/edit.ticket.object");
var CustomerService = /** @class */ (function () {
    function CustomerService(communicationService) {
        this.communicationService = communicationService;
    }
    CustomerService.prototype.addCustomer = function (customer) {
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.ADD_CUSTOMER, customer)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    CustomerService.prototype.deleteCustomer = function (customer) {
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.DEL_CUSTOMER, customer)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    CustomerService.prototype.editCustomer = function (orgCustomer, edtCustomer) {
        var ticket = new edit_ticket_object_1.EditTicketObject(orgCustomer, edtCustomer);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.EDIT_CUSTOMER, ticket)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    CustomerService.prototype.getCustomers = function (filter) {
        var _this = this;
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_CUSTOMERS, filter)
            .then(function (srvMsg) {
            return _this.deserializeArray(srvMsg.dbMsg);
        });
    };
    /* NetworkServiceInterface */
    CustomerService.prototype.convert = function (serverCustomer) {
        if (serverCustomer) {
            var clientCustomer = new customer_object_1.CustomerObject(serverCustomer.id, serverCustomer.name, serverCustomer.phone, serverCustomer.isDeleted);
            return clientCustomer.deserialize();
        }
        return null;
    };
    CustomerService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    CustomerService.prototype.deserializeArray = function (dbMsg) {
        var serverData = dbMsg.data;
        var customers = [];
        if (serverData) {
            var len = serverData.length;
            for (var i = 0; i < len; i++) {
                var serverCustomer = serverData[i];
                var clientCustomer = this.convert(serverCustomer);
                customers.push(clientCustomer);
            }
        }
        return customers;
    };
    return CustomerService;
}());
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map
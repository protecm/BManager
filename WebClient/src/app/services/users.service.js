"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var communication_constants_1 = require("../constants/communication.constants");
var user_object_1 = require("../objects/user/user.object");
var edit_ticket_object_1 = require("../objects/edit.ticket.object");
var UsersService = /** @class */ (function () {
    function UsersService(communicationService) {
        this.communicationService = communicationService;
    }
    UsersService.prototype.addUser = function (user) {
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.ADD_USER, user)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    UsersService.prototype.getUsers = function (filter) {
        var _this = this;
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_USERS, filter)
            .then(function (srvMsg) {
            return _this.deserializeArray(srvMsg.dbMsg);
        });
    };
    UsersService.prototype.deleteUser = function (user) {
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.DEL_USER, user)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    UsersService.prototype.editUser = function (orgUser, edtUser) {
        var ticket = new edit_ticket_object_1.EditTicketObject(orgUser.getObject(), edtUser.getObject());
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.EDIT_USER, ticket)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    /* NetworkServiceInterface */
    UsersService.prototype.convert = function (serverUser) {
        if (serverUser) {
            var clientUser = new user_object_1.UserObject(serverUser.id, serverUser.username, serverUser.password, serverUser.userAccess, serverUser.isDeleted);
            return clientUser.deserialize();
        }
        return null;
    };
    UsersService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    UsersService.prototype.deserializeArray = function (dbMsg) {
        var serverData = dbMsg.data;
        var users = [];
        if (serverData) {
            var len = serverData.length;
            for (var i = 0; i < len; i++) {
                var serverUser = serverData[i];
                var clientUser = this.convert(serverUser);
                users.push(clientUser);
            }
        }
        return users;
    };
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
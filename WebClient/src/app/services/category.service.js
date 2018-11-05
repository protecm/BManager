"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var category_object_1 = require("../objects/category.object");
var communication_constants_1 = require("../constants/communication.constants");
var request_object_1 = require("../objects/request.object");
var edit_ticket_object_1 = require("../objects/edit.ticket.object");
var callback_service_interface_1 = require("../interfaces/callback.service.interface");
var CategoryService = /** @class */ (function (_super) {
    __extends(CategoryService, _super);
    function CategoryService(communicationService, $interval) {
        var _this = _super.call(this, $interval) || this;
        _this.communicationService = communicationService;
        return _this;
    }
    CategoryService.prototype.addCategory = function (category) {
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.ADD_CATEGORY, category)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    CategoryService.prototype.deleteCategory = function (category) {
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.DEL_CATEGORY, category)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    CategoryService.prototype.editCategory = function (orgCategory, edtCategory) {
        var ticket = new edit_ticket_object_1.EditTicketObject(orgCategory, edtCategory);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.EDIT_CATEGORY, ticket)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    CategoryService.prototype.getCategories = function () {
        var _this = this;
        var reqObj = new request_object_1.RequestObject('CategoryService:getCategories');
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_CATEGORIES, reqObj)
            .then(function (srvMsg) {
            return _this.deserializeArray(srvMsg.dbMsg);
        });
    };
    /* NetworkServiceInterface */
    CategoryService.prototype.convert = function (serverCategory) {
        if (serverCategory) {
            var clientCategory = new category_object_1.CategoryObject(serverCategory.id, serverCategory.name, serverCategory.isDeleted);
            return clientCategory.deserialize();
        }
        return null;
    };
    CategoryService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    CategoryService.prototype.deserializeArray = function (dbMsg) {
        var serverData = dbMsg.data;
        var categories = [];
        if (serverData) {
            var len = serverData.length;
            for (var i = 0; i < len; i++) {
                var serverCategory = serverData[i];
                var clientCategory = this.convert(serverCategory);
                categories.push(clientCategory);
            }
        }
        return categories;
    };
    return CategoryService;
}(callback_service_interface_1.CallbackService));
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map
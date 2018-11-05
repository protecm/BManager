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
var product_object_1 = require("../objects/product/product.object");
var communication_constants_1 = require("../constants/communication.constants");
var edit_ticket_object_1 = require("../objects/edit.ticket.object");
var callback_service_interface_1 = require("../interfaces/callback.service.interface");
var ProductService = /** @class */ (function (_super) {
    __extends(ProductService, _super);
    function ProductService(communicationService, $interval) {
        var _this = _super.call(this, $interval) || this;
        _this.communicationService = communicationService;
        return _this;
    }
    ProductService.prototype.addProduct = function (product) {
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.ADD_PRODUCT, product)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    ProductService.prototype.deleteProduct = function (product) {
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.DEL_PRODUCT, product)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    ProductService.prototype.editProduct = function (orgProduct, edtProduct) {
        var ticket = new edit_ticket_object_1.EditTicketObject(orgProduct, edtProduct);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.EDIT_PRODUCT, ticket)
            .then(function (srvMsg) {
            return srvMsg.dbMsg;
        });
    };
    ProductService.prototype.getProducts = function (filter) {
        var _this = this;
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_PRODUCTS, filter)
            .then(function (srvMsg) {
            return _this.deserializeArray(srvMsg.dbMsg);
        });
    };
    /* NetworkServiceInterface */
    ProductService.prototype.convert = function (serverProduct) {
        if (serverProduct) {
            var clientProduct = new product_object_1.ProductObject(serverProduct.id, serverProduct.category, serverProduct.name, serverProduct.isDeleted);
            return clientProduct.deserialize();
        }
        return null;
    };
    ProductService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    ProductService.prototype.deserializeArray = function (dbMsg) {
        var serverData = dbMsg.data;
        var products = [];
        if (serverData) {
            var len = serverData.length;
            for (var i = 0; i < len; i++) {
                var serverProduct = serverData[i];
                var clientProduct = this.convert(serverProduct);
                products.push(clientProduct);
            }
        }
        return products;
    };
    return ProductService;
}(callback_service_interface_1.CallbackService));
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map
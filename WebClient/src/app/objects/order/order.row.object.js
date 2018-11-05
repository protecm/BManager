"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_object_1 = require("../product/product.object");
var order_constants_1 = require("../../constants/order.constants");
var order_note_object_1 = require("./order.note.object");
var OrderRowObject = /** @class */ (function () {
    function OrderRowObject(orderId, orderVersion, rowNumber, product, amount, notes, status) {
        if (status === void 0) { status = order_constants_1.OrderConstants.STATUS_NEW; }
        this.orderId = orderId;
        this.orderVersion = orderVersion;
        this.rowNumber = rowNumber;
        this.product = product;
        this.amount = amount;
        this.notes = notes;
        this.status = status;
    }
    Object.defineProperty(OrderRowObject.prototype, "monitorStatus", {
        get: function () {
            return this.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderRowObject.prototype, "isNew", {
        get: function () {
            return this.status === order_constants_1.OrderConstants.STATUS_NEW;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderRowObject.prototype, "isDirty", {
        get: function () {
            return this.status.code > order_constants_1.OrderConstants.STATUS_NEW.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderRowObject.prototype, "isStartEnabled", {
        get: function () {
            return this.status.code < order_constants_1.OrderConstants.STATUS_IN_PROGRESS.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderRowObject.prototype, "isInProgress", {
        get: function () {
            return this.status === order_constants_1.OrderConstants.STATUS_IN_PROGRESS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderRowObject.prototype, "isReady", {
        get: function () {
            return this.status === order_constants_1.OrderConstants.STATUS_READY;
        },
        enumerable: true,
        configurable: true
    });
    /* NetworkObjectInterface */
    OrderRowObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    OrderRowObject.prototype.deserialize = function () {
        this.product = new product_object_1.ProductObject(this.product.id, this.product.category, this.product.name, this.product.isDeleted).deserialize();
        this.notes = new order_note_object_1.OrderNoteObject(this.notes.note, this.notes.isResolved);
        var statusCode = parseInt(this.status.toString());
        this.status = order_constants_1.OrderConstants.GetStatus(statusCode);
        return this;
    };
    return OrderRowObject;
}());
exports.OrderRowObject = OrderRowObject;
//# sourceMappingURL=order.row.object.js.map
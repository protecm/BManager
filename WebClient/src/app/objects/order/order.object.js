"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_object_1 = require("../customer/customer.object");
var order_row_object_1 = require("./order.row.object");
var order_constants_1 = require("../../constants/order.constants");
var order_note_object_1 = require("./order.note.object");
var OrderObject = /** @class */ (function () {
    function OrderObject(id, version, customer, orderDate, supplyDate, notes, orderRows, status) {
        if (status === void 0) { status = order_constants_1.OrderConstants.STATUS_NEW; }
        this.id = id;
        this.version = version;
        this.customer = customer;
        this.orderDate = orderDate;
        this.supplyDate = supplyDate;
        this.notes = notes;
        this.orderRows = orderRows;
        this.status = status;
    }
    Object.defineProperty(OrderObject.prototype, "isNotesResolved", {
        get: function () {
            var isRowsNotesResolved = true;
            var len = this.orderRows.length;
            for (var i = 0; i < len; i++) {
                if (!this.orderRows[i].notes.isReallyResolved) {
                    isRowsNotesResolved = false;
                    break;
                }
            }
            return this.notes.isReallyResolved && isRowsNotesResolved;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isUnApproved", {
        get: function () {
            return this.status.code < order_constants_1.OrderConstants.STATUS_APPROVED.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isInProductionMode", {
        get: function () {
            return this.status.code >= order_constants_1.OrderConstants.STATUS_APPROVED.code &&
                this.status.code < order_constants_1.OrderConstants.STATUS_DELIVERIES.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isCanceled", {
        get: function () {
            return this.status === order_constants_1.OrderConstants.STATUS_CANCELED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isDirty", {
        get: function () {
            return this.status.code > order_constants_1.OrderConstants.STATUS_NEW.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isActive", {
        get: function () {
            return this.status.code >= order_constants_1.OrderConstants.STATUS_APPROVED.code && this.status.code < order_constants_1.OrderConstants.STATUS_SUPPLIED.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isUpdated", {
        get: function () {
            return this.status.code === order_constants_1.OrderConstants.STATUS_UPDATED.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isOnDelay", {
        get: function () {
            var nowDateTime = new Date();
            return ((this.status.code < order_constants_1.OrderConstants.STATUS_SUPPLIED.code) && (this.supplyDate < nowDateTime));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isInProgress", {
        get: function () {
            var len = this.orderRows.length;
            for (var i = 0; i < len; i++) {
                if (this.orderRows[i].isInProgress) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isReady", {
        get: function () {
            var len = this.orderRows.length;
            for (var i = 0; i < len; i++) {
                if (!this.orderRows[i].isReady) {
                    return false;
                }
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isRowsDirty", {
        get: function () {
            var len = this.orderRows.length;
            for (var i = 0; i < len; i++) {
                if (this.orderRows[i].isDirty) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isInDeliveries", {
        get: function () {
            return this.status.code >= order_constants_1.OrderConstants.STATUS_DELIVERIES.code && this.status.code <= order_constants_1.OrderConstants.STATUS_SUPPLIED.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isWaitingPacking", {
        get: function () {
            return this.status === order_constants_1.OrderConstants.STATUS_DELIVERIES;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isPacking", {
        get: function () {
            return this.status === order_constants_1.OrderConstants.STATUS_PACKING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isPacked", {
        get: function () {
            return this.status === order_constants_1.OrderConstants.STATUS_PACKED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "isSupplied", {
        get: function () {
            return this.status === order_constants_1.OrderConstants.STATUS_SUPPLIED;
        },
        enumerable: true,
        configurable: true
    });
    OrderObject.prototype.getOrderRowsStatus = function () {
        if (this.isInProgress) {
            return order_constants_1.OrderConstants.STATUS_IN_PROGRESS;
        }
        if (this.isReady) {
            return order_constants_1.OrderConstants.STATUS_READY;
        }
        if (this.isRowsDirty) {
            return order_constants_1.OrderConstants.STATUS_IN_PROGRESS;
        }
        return order_constants_1.OrderConstants.STATUS_NEW;
    };
    Object.defineProperty(OrderObject.prototype, "monitorStatus", {
        get: function () {
            if (this.isOnDelay) {
                return order_constants_1.OrderConstants.STATUS_ON_DELAY;
            }
            if (this.isUpdated) {
                return order_constants_1.OrderConstants.STATUS_UPDATED;
            }
            if (this.isUnApproved) {
                return order_constants_1.OrderConstants.STATUS_WAITING_APPROVE;
            }
            return this.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderObject.prototype, "progress", {
        get: function () {
            if (this.isInProductionMode) {
                return this.productionProgress();
            }
            return this.deliveryProgress();
        },
        enumerable: true,
        configurable: true
    });
    OrderObject.prototype.productionProgress = function () {
        var _progress = 0;
        switch (this.status) {
            case order_constants_1.OrderConstants.STATUS_APPROVED:
                _progress = 10;
                break;
            case order_constants_1.OrderConstants.STATUS_IN_PROGRESS:
                _progress = this.calculateOrderRowsProgress(10);
                break;
            case order_constants_1.OrderConstants.STATUS_READY:
                _progress = 95;
                break;
            case order_constants_1.OrderConstants.STATUS_DELIVERIES:
                _progress = 100;
                break;
        }
        return _progress;
    };
    OrderObject.prototype.deliveryProgress = function () {
        var _progress = 0;
        switch (this.status) {
            case order_constants_1.OrderConstants.STATUS_PACKING:
                _progress = 30;
                break;
            case order_constants_1.OrderConstants.STATUS_PACKED:
                _progress = 90;
                break;
            case order_constants_1.OrderConstants.STATUS_SUPPLIED:
                _progress = 100;
                break;
        }
        return _progress;
    };
    OrderObject.prototype.calculateOrderRowsProgress = function (startProgress) {
        // IN_PROGRESS = 40% (in total)
        // READY = 40% (in total)
        // Each status (2) will be 40 divide by number of order rows
        var _progress = startProgress;
        var count = this.orderRows.length;
        var progressStatusValue = 40 / count;
        for (var i = 0; i < count; i++) {
            if (this.orderRows[i].status === order_constants_1.OrderConstants.STATUS_IN_PROGRESS) {
                _progress += progressStatusValue;
            }
            else if (this.orderRows[i].status === order_constants_1.OrderConstants.STATUS_READY) {
                _progress += (2 * progressStatusValue);
            }
        }
        return Math.round(_progress * 100) / 100; //Round to at most 2 decimal places
    };
    /* NetworkObjectInterface */
    OrderObject.prototype.serialize = function (base64) {
        var dataStr = JSON.stringify(this);
        return base64.encode(dataStr);
    };
    OrderObject.prototype.deserialize = function () {
        this.customer = new customer_object_1.CustomerObject(this.customer.id, this.customer.name, this.customer.phone, this.customer.isDeleted).deserialize();
        // https://stackoverflow.com/questions/13622142/javascript-to-convert-utc-to-local-time
        this.orderDate = new Date(this.orderDate + ' UTC');
        this.supplyDate = new Date(this.supplyDate + ' UTC');
        this.notes = new order_note_object_1.OrderNoteObject(this.notes.note, this.notes.isResolved);
        this.orderRows.forEach(function (row, ind, arr) {
            arr[ind] = new order_row_object_1.OrderRowObject(row.orderId, row.orderVersion, row.rowNumber, row.product, row.amount, row.notes, row.status).deserialize();
        });
        var statusCode = parseInt(this.status.toString());
        this.status = order_constants_1.OrderConstants.GetStatus(statusCode);
        return this;
    };
    return OrderObject;
}());
exports.OrderObject = OrderObject;
//# sourceMappingURL=order.object.js.map
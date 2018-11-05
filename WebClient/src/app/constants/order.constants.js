"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderConstants = /** @class */ (function () {
    function OrderConstants() {
    }
    OrderConstants.GetStatus = function (code) {
        var len = OrderConstants.STATUS_LIST.length;
        for (var i = 0; i < len; i++) {
            if (code === OrderConstants.STATUS_LIST[i].code) {
                return OrderConstants.STATUS_LIST[i];
            }
        }
        return OrderConstants.STATUS_UNKNOWN;
    };
    /* Definition status  */
    OrderConstants.STATUS_NEW = {
        code: 0,
        description: 'NEW',
        styleClass: 'status-new',
        backgroundColor: '#3bafda'
    };
    OrderConstants.STATUS_UPDATED = {
        code: 1,
        description: 'UPDATED',
        styleClass: 'status-updated',
        backgroundColor: '#CCD1D9'
    };
    OrderConstants.STATUS_APPROVED = {
        code: 2,
        description: 'APPROVED',
        styleClass: 'status-approved',
        backgroundColor: '#48CFAD'
    };
    OrderConstants.STATUS_IN_PROGRESS = {
        code: 3,
        description: 'IN_PROGRESS',
        styleClass: 'status-in-progress',
        backgroundColor: '#FFCE54'
    };
    OrderConstants.STATUS_READY = {
        code: 4,
        description: 'READY',
        styleClass: 'status-ready',
        backgroundColor: '#A0D468'
    };
    OrderConstants.STATUS_DELIVERIES = {
        code: 5,
        description: 'DELIVERIES',
        styleClass: 'status-deliveries',
        backgroundColor: '#CCD1D9'
    };
    OrderConstants.STATUS_PACKING = {
        code: 6,
        description: 'PACKING',
        styleClass: 'status-packing',
        backgroundColor: '#FFCE54'
    };
    OrderConstants.STATUS_PACKED = {
        code: 7,
        description: 'PACKED',
        styleClass: 'status-packed',
        backgroundColor: '#A0D468'
    };
    OrderConstants.STATUS_SUPPLIED = {
        code: 8,
        description: 'SUPPLIED',
        styleClass: 'status-supplied',
        backgroundColor: '#4FC1E9'
    };
    OrderConstants.STATUS_CANCELED = {
        code: 9,
        description: 'CANCELED',
        styleClass: 'status-canceled',
        backgroundColor: '#d8bfbf'
    };
    /*  Monitoring (active) status  */
    OrderConstants.STATUS_ON_DELAY = {
        code: 100,
        description: 'ON_DELAY',
        styleClass: 'status-on-delay',
        backgroundColor: '#FC6E51'
    };
    OrderConstants.STATUS_WAITING_APPROVE = {
        code: 101,
        description: 'WAITING_APPROVE',
        styleClass: 'status-waiting-approve',
        backgroundColor: '#CCD1D9'
    };
    OrderConstants.STATUS_UNKNOWN = {
        code: 404,
        description: 'UNKNOWN',
        styleClass: '',
        backgroundColor: ''
    };
    /*  The order of the code numbers is important, in this way we can query all active orders, code < 5 (supplied)  */
    OrderConstants.STATUS_LIST = [
        OrderConstants.STATUS_NEW,
        OrderConstants.STATUS_UPDATED,
        OrderConstants.STATUS_APPROVED,
        OrderConstants.STATUS_IN_PROGRESS,
        OrderConstants.STATUS_READY,
        OrderConstants.STATUS_DELIVERIES,
        OrderConstants.STATUS_PACKING,
        OrderConstants.STATUS_PACKED,
        OrderConstants.STATUS_SUPPLIED,
        OrderConstants.STATUS_CANCELED
    ];
    return OrderConstants;
}());
exports.OrderConstants = OrderConstants;
//# sourceMappingURL=order.constants.js.map
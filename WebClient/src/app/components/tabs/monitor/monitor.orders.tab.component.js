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
var order_constants_1 = require("../../../constants/order.constants");
var monitor_base_tab_component_1 = require("./monitor.base.tab.component");
var order_approve_updated_modal_component_1 = require("../../modals/order/order.approve.updated.modal.component");
var order_note_object_1 = require("../../../objects/order/order.note.object");
var MonitorOrdersTabComponent = /** @class */ (function (_super) {
    __extends(MonitorOrdersTabComponent, _super);
    function MonitorOrdersTabComponent(modalService, confService, monitorService) {
        var _this = _super.call(this, monitorService) || this;
        _this.modalService = modalService;
        _this.confService = confService;
        _this.isCollapsed = {};
        _this.isApproveInProgress = {};
        _this.isMoveOrderToDeliveriesInProgress = {};
        _this.sortProperty = '+supplyDate';
        _this.getActiveOrdersFromServer();
        return _this;
    }
    MonitorOrdersTabComponent.prototype.getActiveOrdersFromServer = function () {
        var _this = this;
        if (!this.isGettingOrdersFromServer) {
            this.isGettingOrdersFromServer = true;
            this.cgBusyOrders.promise = this.monitorService.getActiveOrders()
                .then(function (data) {
                _this.isGettingOrdersFromServer = false;
                _this.orders = data;
            });
        }
    };
    Object.defineProperty(MonitorOrdersTabComponent.prototype, "isNotesEnforced", {
        get: function () {
            return this.confService.configurationData.commentsEnforcement;
        },
        enumerable: true,
        configurable: true
    });
    MonitorOrdersTabComponent.prototype.resolveOrderNotes = function (order) {
        var newNote = new order_note_object_1.OrderNoteObject(order.notes.note, true);
        return this.monitorService.updateOrderNote(order, newNote)
            .then(function (result) {
            if (result) {
                order.notes.isResolved = true;
            }
            return result;
        });
    };
    MonitorOrdersTabComponent.prototype.resolveOrderRowNotes = function (orderRow) {
        var newNote = new order_note_object_1.OrderNoteObject(orderRow.notes.note, true);
        return this.monitorService.updateOrderRowNote(orderRow, newNote)
            .then(function (result) {
            if (result) {
                orderRow.notes.isResolved = true;
            }
            return result;
        });
    };
    MonitorOrdersTabComponent.prototype.approveOrder = function (order) {
        var _this = this;
        if (order) {
            if (order.isUpdated) {
                this.approveUpdatedOrder(order);
            }
            else {
                //Update server
                this.isApproveInProgress[order.id] = true;
                this.monitorService.updateOrderStatus(order, order_constants_1.OrderConstants.STATUS_APPROVED)
                    .then(function (result) {
                    _this.isApproveInProgress[order.id] = false;
                    if (result) {
                        //Update Client
                        order.status = order_constants_1.OrderConstants.STATUS_APPROVED;
                    }
                });
            }
        } //Big If
    };
    MonitorOrdersTabComponent.prototype.approveUpdatedOrder = function (order) {
        var _this = this;
        this.isApproveInProgress[order.id] = true;
        var historyOrderPromise = this.monitorService.getPreviousOrderVersion(order);
        historyOrderPromise
            .then(function (historyOrder) {
            _this.isApproveInProgress[order.id] = false;
            if (historyOrder) {
                var options = new order_approve_updated_modal_component_1.orderApproveUpdatedModalComponent(order, historyOrder);
                _this.modalService.showModal(options)
                    .then(function (result) {
                    if (result) {
                        //Update Client
                        order.status = result;
                    }
                }, function (error) {
                    //handle error/dismiss
                });
            }
            else {
                //handle error - problem with history order
            }
        });
    };
    MonitorOrdersTabComponent.prototype.moveOrderToDeliveries = function (order) {
        var _this = this;
        if (order && order.isReady) {
            //Update server
            this.isMoveOrderToDeliveriesInProgress[order.id] = true;
            this.monitorService.updateOrderStatus(order, order_constants_1.OrderConstants.STATUS_DELIVERIES)
                .then(function (result) {
                _this.isMoveOrderToDeliveriesInProgress[order.id] = false;
                if (result) {
                    //Update Client
                    order.status = order_constants_1.OrderConstants.STATUS_DELIVERIES;
                }
            });
        }
    };
    MonitorOrdersTabComponent.prototype.toggleColapse = function (orderId) {
        this.isCollapsed[orderId] = !this.isCollapsed[orderId];
    };
    MonitorOrdersTabComponent.prototype.$onInit = function () {
        var _this = this;
        this.monitorService.registerTickListener(this.tabIndex, function () {
            _this.getActiveOrdersFromServer();
        }, this.confService.configurationData.monitorRefreshRateMinutes * 60000);
    };
    MonitorOrdersTabComponent.prototype.$onDestroy = function () {
        this.monitorService.stopTickListener(this.tabIndex);
    };
    return MonitorOrdersTabComponent;
}(monitor_base_tab_component_1.MonitorBaseTabComponent));
exports.monitorOrdersTabComponent = {
    controller: MonitorOrdersTabComponent,
    controllerAs: 'vm',
    bindings: {
        tabIndex: '<'
    },
    templateUrl: 'app/templates/tabs/monitor.orders.tab.template.html'
};
//# sourceMappingURL=monitor.orders.tab.component.js.map
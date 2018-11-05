"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_constants_1 = require("../constants/order.constants");
var order_view_modal_component_1 = require("./modals/order/order.view.modal.component");
var busy_helper_1 = require("../helpers/busy.helper");
var DeliveriesComponent = /** @class */ (function () {
    function DeliveriesComponent(deliveriesService, monitorService, modalService, confService) {
        this.deliveriesService = deliveriesService;
        this.monitorService = monitorService;
        this.modalService = modalService;
        this.confService = confService;
        this.isPackingInProgress = {};
        this.isReadyOrderInProgress = {};
        this.isSupplyInProgress = {};
        this.cgBusyOrders = busy_helper_1.BusyHelper.GetDefaultBusy('LOADING_ORDERS');
        this.sortProperty = '+supplyDate';
        this.getOrdersFromServer();
    }
    DeliveriesComponent.prototype.getOrdersFromServer = function () {
        var _this = this;
        if (!this.isGettingOrdersFromServer) {
            this.isGettingOrdersFromServer = true;
            this.cgBusyOrders.promise = this.deliveriesService.getOrders()
                .then(function (data) {
                _this.isGettingOrdersFromServer = false;
                _this.orders = data;
            });
        }
    };
    DeliveriesComponent.prototype.showOrder = function (order) {
        //  TODO - create orderViewModalComponent
        var options = new order_view_modal_component_1.orderViewModalComponent(order);
        this.modalService.showModal(options)
            .then(function () {
            // modal closed
        }, function (error) {
            //handle error/dismiss
        });
    };
    DeliveriesComponent.prototype.packOrder = function (order) {
        var _this = this;
        if (order) {
            //Update server
            this.isPackingInProgress[order.id] = true;
            this.monitorService.updateOrderStatus(order, order_constants_1.OrderConstants.STATUS_PACKING)
                .then(function (result) {
                _this.isPackingInProgress[order.id] = false;
                if (result) {
                    //Update Client
                    order.status = order_constants_1.OrderConstants.STATUS_PACKING;
                }
            });
        }
    };
    DeliveriesComponent.prototype.readyOrder = function (order) {
        var _this = this;
        if (order) {
            //Update server
            this.isReadyOrderInProgress[order.id] = true;
            this.monitorService.updateOrderStatus(order, order_constants_1.OrderConstants.STATUS_PACKED)
                .then(function (result) {
                _this.isReadyOrderInProgress[order.id] = false;
                if (result) {
                    //Update Client
                    order.status = order_constants_1.OrderConstants.STATUS_PACKED;
                }
            });
        }
    };
    DeliveriesComponent.prototype.supplyOrder = function (order) {
        var _this = this;
        if (order) {
            //Update server
            this.isSupplyInProgress[order.id] = true;
            this.monitorService.updateOrderStatus(order, order_constants_1.OrderConstants.STATUS_SUPPLIED)
                .then(function (result) {
                _this.isSupplyInProgress[order.id] = false;
                if (result) {
                    //Update Client
                    order.status = order_constants_1.OrderConstants.STATUS_SUPPLIED;
                }
            });
        }
    };
    DeliveriesComponent.prototype.$onInit = function () {
        var _this = this;
        this.listenerID = this.deliveriesService.getUnusedID();
        if (this.listenerID) {
            this.deliveriesService.registerTickListener(this.listenerID, function () {
                _this.getOrdersFromServer();
            }, this.confService.configurationData.deliveriesRefreshRateMinutes * 60000);
        }
    };
    DeliveriesComponent.prototype.$onDestroy = function () {
        this.deliveriesService.stopTickListener(this.listenerID);
    };
    return DeliveriesComponent;
}());
exports.deliveriesComponent = {
    controller: DeliveriesComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/deliveries.template.html'
};
//# sourceMappingURL=deliveries.component.js.map
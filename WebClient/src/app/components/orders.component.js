"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_add_modal_component_1 = require("./modals/order/order.add.modal.component");
var order_object_1 = require("../objects/order/order.object");
var order_edit_modal_component_1 = require("./modals/order/order.edit.modal.component");
var order_filter_object_1 = require("../objects/order/order.filter.object");
var date_helper_1 = require("../helpers/date.helper");
var order_row_object_1 = require("../objects/order/order.row.object");
var order_note_object_1 = require("../objects/order/order.note.object");
var OrdersComponent = /** @class */ (function () {
    function OrdersComponent(modalService, orderService, toastService) {
        var _this = this;
        this.modalService = modalService;
        this.orderService = orderService;
        this.toastService = toastService;
        this.editOrder = function (order) {
            var options = new order_edit_modal_component_1.orderEditModalComponent(order);
            return _this.modalService.showModal(options)
                .then(function (data) {
                if (data) {
                    //order edited
                    _this.updateOrder(order, data);
                }
            }, function (error) {
                //handle error/dismiss
            });
        };
        this.getOrdersFromServer(order_filter_object_1.OrderFilterObject.GetCurrentMonthOrdersFilter())
            .then(function (data) {
            /* */
        });
        this.getCommonOrderedProductsFromServer();
        this.dateOptions = date_helper_1.DateHelper.GetDefaultDateOptions();
        this.fromDate = date_helper_1.DateHelper.GetFirstDateOfMonth();
        this.toDate = date_helper_1.DateHelper.GetLastDateOfMonth();
    }
    OrdersComponent.prototype.createOrder = function () {
        var _this = this;
        //TODO - code review
        /*  Quick products selection Processor */
        var quickOrder = new order_object_1.OrderObject(null, 0, null, new Date(), null, new order_note_object_1.OrderNoteObject('', false), []);
        if (this.commonProducts) {
            var len = this.commonProducts.length;
            var rowCounter = 1;
            for (var i = 0; i < len; i++) {
                var commonP = this.commonProducts[i];
                if (commonP.isSelected) {
                    var oRow = new order_row_object_1.OrderRowObject(null, 0, rowCounter++, commonP.data, 0, new order_note_object_1.OrderNoteObject('', false));
                    quickOrder.orderRows.push(oRow);
                }
            }
        }
        /*  Open creation modal  */
        var options = new order_add_modal_component_1.orderAddModalComponent(quickOrder);
        this.modalService.showModal(options)
            .then(function (data) {
            if (data) {
                //New order created
                _this.addOrder(data);
                _this.toastService.showSuccess('CREATED_SUCCESSFULLY', 'ORDER');
            }
        }, function (error) {
            //handle error/dismiss
        }).then(function () {
            //TODO - code review
            //Finally
            _this.clearCommonProductsSelection();
        });
    };
    OrdersComponent.prototype.getOrdersBetweenDates = function (valid) {
        var _this = this;
        if (valid) {
            this.isLoadingOrders = true;
            /* Selected dates with bootstrap's 'uib-datepicker' are created with 00:00:00 time,
            to get the orders with the 'toDate' value we will filter with the next day */
            var toDateTomorrow = date_helper_1.DateHelper.GetTomorrowDate(this.toDate);
            var filter = new order_filter_object_1.OrderFilterObject(this.fromDate, toDateTomorrow);
            this.getOrdersFromServer(filter)
                .then(function (data) {
                _this.isLoadingOrders = false;
            });
        }
    };
    OrdersComponent.prototype.getOrdersFromServer = function (filter) {
        var _this = this;
        return this.orderService.getOrders(filter)
            .then(function (data) {
            return _this.orders = data;
        });
    };
    OrdersComponent.prototype.getCommonOrderedProductsFromServer = function () {
        var _this = this;
        this.orderService.getCommonProducts()
            .then(function (data) {
            if (data) {
                _this.commonProducts = _this.productsToToggleBtns(data);
            }
        });
    };
    OrdersComponent.prototype.productsToToggleBtns = function (products) {
        var arr = [];
        for (var i = 0; i < products.length; i++) {
            arr.push({
                data: products[i],
                msg: products[i].name,
                isSelected: false
            });
        }
        return arr;
    };
    OrdersComponent.prototype.clearCommonProductsSelection = function () {
        //TODO - code review
        this.commonProducts.forEach(function (row, ind, arr) {
            row.isSelected = false;
        });
    };
    OrdersComponent.prototype.addOrder = function (order) {
        this.orders.push(order);
    };
    OrdersComponent.prototype.updateOrder = function (orgOrder, edtOrder) {
        var len = this.orders.length;
        for (var i = 0; i < len; i++) {
            if (this.orders[i].id === orgOrder.id) {
                this.orders[i] = edtOrder;
                break;
            }
        }
    };
    return OrdersComponent;
}());
exports.ordersComponent = {
    controller: OrdersComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/orders.template.html'
};
//# sourceMappingURL=orders.component.js.map
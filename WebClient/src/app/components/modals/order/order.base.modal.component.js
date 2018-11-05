"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_object_1 = require("../../../objects/customer/customer.object");
var order_row_object_1 = require("../../../objects/order/order.row.object");
var product_object_1 = require("../../../objects/product/product.object");
var customer_add_modal_component_1 = require("../customer/customer.add.modal.component");
var product_add_modal_component_1 = require("../product/product.add.modal.component");
var order_note_object_1 = require("../../../objects/order/order.note.object");
var product_filter_object_1 = require("../../../objects/product/product.filter.object");
var customer_filter_object_1 = require("../../../objects/customer/customer.filter.object");
var OrderBaseModalComponent = /** @class */ (function () {
    function OrderBaseModalComponent($uibModalInstance, customerService, productService, modalService, toastService, lodash, order) {
        this.$uibModalInstance = $uibModalInstance;
        this.customerService = customerService;
        this.productService = productService;
        this.modalService = modalService;
        this.toastService = toastService;
        this.lodash = lodash;
        this.order = order;
        this.dateOptions = {
            formatDay: 'dd',
            formatMonth: 'MM',
            formatYear: 'yyyy',
            startingDay: 0
        };
        this.initView();
    }
    OrderBaseModalComponent.prototype.initView = function () {
        var _this = this;
        var orderCopy;
        if (this.order) {
            orderCopy = this.lodash.cloneDeep(this.order);
            this.id = orderCopy.id;
            this.version = orderCopy.version;
            this.orderDate = orderCopy.orderDate;
            this.orderTime = orderCopy.orderDate;
            this.supplyDate = orderCopy.supplyDate;
            this.supplyTime = orderCopy.supplyDate;
            this.notes = orderCopy.notes;
        }
        else {
            this.version = 0;
            this.orderDate = new Date();
            this.orderTime = new Date();
            this.notes = new order_note_object_1.OrderNoteObject('', false);
            this.orderRows = [];
            this.addOrderRow();
        }
        this.getCustomersFromServer()
            .then(function (data) {
            if (orderCopy) {
                _this.selectedCustomer = orderCopy.customer;
            }
        });
        this.getProductsFromServer()
            .then(function (data) {
            if (orderCopy) {
                _this.orderRows = orderCopy.orderRows;
            }
            //TODO - code review - consider always adding one row from start...
            //If there are rows they will override the array of rows.
            if (_this.orderRows.length === 0)
                _this.addOrderRow();
        });
    };
    OrderBaseModalComponent.prototype.createCustomer = function (uiSelectController, customerName) {
        var _this = this;
        var customer = new customer_object_1.CustomerObject(null, customerName, '', false);
        var options = new customer_add_modal_component_1.customerAddModalComponent(customer);
        return this.modalService.showModal(options)
            .then(function (data) {
            if (data) {
                //New customer created
                _this.customers.push(data);
                _this.selectedCustomer = data;
                uiSelectController.close(); // ui-select controller
                _this.toastService.showSuccess('CREATED_SUCCESSFULLY', 'CUSTOMER');
            }
            return true;
        }, function (error) {
            //handle error/dismiss
            return false;
        });
    };
    OrderBaseModalComponent.prototype.createProduct = function (row, uiSelectController, productName) {
        var _this = this;
        var product = new product_object_1.ProductObject(null, null, productName, false);
        var options = new product_add_modal_component_1.productAddModalComponent(product);
        return this.modalService.showModal(options)
            .then(function (data) {
            if (data) {
                //New customer created
                _this.products.push(data);
                row.product = data;
                uiSelectController.close(); // ui-select controller
                _this.toastService.showSuccess('CREATED_SUCCESSFULLY', 'PRODUCT');
            }
            return true;
        }, function (error) {
            //handle error/dismiss
            return false;
        });
    };
    OrderBaseModalComponent.prototype.cancel = function () {
        this.$uibModalInstance.dismiss();
    };
    Object.defineProperty(OrderBaseModalComponent.prototype, "shouldHideOrderActions", {
        get: function () {
            return this.isEditDisabled || !this.order || (this.order.id === null);
        },
        enumerable: true,
        configurable: true
    });
    OrderBaseModalComponent.prototype.enableEdit = function () {
        this.isEditDisabled = false;
    };
    OrderBaseModalComponent.prototype.disableEdit = function (alert) {
        this.isEditDisabled = true;
        this.alert = alert;
    };
    OrderBaseModalComponent.prototype.getCustomersFromServer = function () {
        var _this = this;
        return this.customerService.getCustomers(customer_filter_object_1.CustomerFilterObject.GetActiveCustomersFilter())
            .then(function (data) {
            return _this.customers = data;
        });
    };
    OrderBaseModalComponent.prototype.getProductsFromServer = function () {
        var _this = this;
        return this.productService.getProducts(product_filter_object_1.ProductFilterObject.GetActiveProductsFilter())
            .then(function (data) {
            return _this.products = data;
        });
    };
    OrderBaseModalComponent.prototype.mergeDateTime = function (dateObj, timeObj) {
        dateObj.setHours(timeObj.getHours());
        dateObj.setMinutes(timeObj.getMinutes());
        dateObj.setSeconds(timeObj.getSeconds());
    };
    OrderBaseModalComponent.prototype.addOrderRow = function () {
        //TODO - code review, in edit mode we have order id!!! but we are creating row with null order id,
        //from looking at the server, we are always using orderID of order and not row!!
        var rowNumber = this.orderRows.length + 1;
        var row = new order_row_object_1.OrderRowObject(null, this.version, rowNumber, null, 0, new order_note_object_1.OrderNoteObject('', false));
        this.orderRows.push(row);
    };
    OrderBaseModalComponent.prototype.removeOrderRow = function (pos) {
        this.orderRows.splice(pos, 1);
        //correct row numbers
        var len = this.orderRows.length;
        for (var i = pos; i < len; i++) {
            this.orderRows[i].rowNumber--;
        }
    };
    return OrderBaseModalComponent;
}());
exports.OrderBaseModalComponent = OrderBaseModalComponent;
var OrderBaseModalSettings = /** @class */ (function () {
    function OrderBaseModalSettings(order) {
        this.animation = true;
        this.backdrop = 'static';
        this.controller = OrderBaseModalComponent;
        this.bindToController = true;
        this.controllerAs = 'vm';
        this.templateUrl = 'app/templates/modals/order.modal.template.html';
        this.size = 'lg';
        this.resolve = {
            order: function () { return order; }
        };
    }
    return OrderBaseModalSettings;
}());
exports.OrderBaseModalSettings = OrderBaseModalSettings;
//# sourceMappingURL=order.base.modal.component.js.map
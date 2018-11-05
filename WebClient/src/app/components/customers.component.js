"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_add_modal_component_1 = require("./modals/customer/customer.add.modal.component");
var customer_edit_modal_component_1 = require("./modals/customer/customer.edit.modal.component");
var db_messages_constants_1 = require("../constants/db.messages.constants");
var customer_filter_object_1 = require("../objects/customer/customer.filter.object");
var CustomersComponent = /** @class */ (function () {
    function CustomersComponent(modalService, customerService, confirmationService, $translate, toastService) {
        var _this = this;
        this.modalService = modalService;
        this.customerService = customerService;
        this.confirmationService = confirmationService;
        this.$translate = $translate;
        this.toastService = toastService;
        this.deleteCustomerRequest = function (customer) {
            var title = _this.$translate.instant('DELETE_CUSTOMER');
            var bodyMsg = _this.confirmationService.getDefaultBodyTemplate(_this.$translate.instant('CONFIRM_DELETE_CUSTOMER'), customer.name);
            return _this.confirmationService.confirm(title, bodyMsg)
                .then(function (result) {
                if (result) {
                    return _this.deleteCustomer(customer);
                }
            }, function (error) {
                //handle error/dismiss
            });
        };
        this.editCustomer = function (customer) {
            var options = new customer_edit_modal_component_1.customerEditModalComponent(customer);
            return _this.modalService.showModal(options)
                .then(function (data) {
                if (data) {
                    //customer edited
                    _this.updateCustomer(customer, data);
                }
            }, function (error) {
                //handle error/dismiss
            });
        };
        this.getCustomersFromServer();
    }
    CustomersComponent.prototype.createCustomer = function () {
        var _this = this;
        var options = new customer_add_modal_component_1.customerAddModalComponent();
        this.modalService.showModal(options)
            .then(function (data) {
            if (data) {
                //New customer created
                _this.addCustomer(data);
                _this.toastService.showSuccess('CREATED_SUCCESSFULLY', 'CUSTOMER');
            }
        }, function (error) {
            //handle error/dismiss
        });
    };
    CustomersComponent.prototype.deleteCustomer = function (customer) {
        var _this = this;
        return this.customerService.deleteCustomer(customer)
            .then(function (dbMsg) {
            if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                //category deleted
                customer.isDeleted = true;
                _this.removeCustomer(customer);
                _this.toastService.showSuccess('DELETED_SUCCESSFULLY', 'CUSTOMER');
            }
            else {
                //handle error
            }
        });
    };
    CustomersComponent.prototype.getCustomersFromServer = function () {
        var _this = this;
        this.customerService.getCustomers(customer_filter_object_1.CustomerFilterObject.GetActiveCustomersFilter())
            .then(function (data) {
            _this.customers = data;
        });
    };
    CustomersComponent.prototype.addCustomer = function (customer) {
        this.customers.push(customer);
    };
    CustomersComponent.prototype.updateCustomer = function (orgCustomer, edtCustomer) {
        var len = this.customers.length;
        for (var i = 0; i < len; i++) {
            if (this.customers[i].id === orgCustomer.id) {
                this.customers[i] = edtCustomer;
                break;
            }
        }
    };
    CustomersComponent.prototype.removeCustomer = function (customer) {
        var len = this.customers.length;
        for (var i = 0; i < len; i++) {
            if (this.customers[i].id === customer.id) {
                this.customers.splice(i, 1);
                break;
            }
        }
    };
    return CustomersComponent;
}());
exports.customersComponent = {
    controller: CustomersComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/customers.template.html'
};
//# sourceMappingURL=customers.component.js.map
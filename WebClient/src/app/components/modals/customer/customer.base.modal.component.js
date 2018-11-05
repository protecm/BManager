"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_helper_1 = require("../../../helpers/alert.helper");
var CustomerBaseModalComponent = /** @class */ (function () {
    function CustomerBaseModalComponent($uibModalInstance, customer) {
        this.$uibModalInstance = $uibModalInstance;
        this.customer = customer;
        if (this.customer) {
            this.id = this.customer.id;
            this.name = this.customer.name;
            this.phone = this.customer.phone;
            this.isDeleted = this.customer.isDeleted;
        }
        else {
            this.isDeleted = false;
        }
        this.alertHelper = new alert_helper_1.AlertHelper();
    }
    CustomerBaseModalComponent.prototype.cancel = function () {
        this.$uibModalInstance.dismiss();
    };
    return CustomerBaseModalComponent;
}());
exports.CustomerBaseModalComponent = CustomerBaseModalComponent;
var CustomerBaseModalSettings = /** @class */ (function () {
    function CustomerBaseModalSettings(customer) {
        this.animation = true;
        this.backdrop = 'static';
        this.controller = CustomerBaseModalComponent;
        this.bindToController = true;
        this.controllerAs = 'vm';
        this.templateUrl = 'app/templates/modals/customer.modal.template.html';
        this.resolve = {
            customer: function () { return customer; }
        };
    }
    return CustomerBaseModalSettings;
}());
exports.CustomerBaseModalSettings = CustomerBaseModalSettings;
//# sourceMappingURL=customer.base.modal.component.js.map
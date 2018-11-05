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
var alert_helper_1 = require("../../../helpers/alert.helper");
var customer_object_1 = require("../../../objects/customer/customer.object");
var db_messages_constants_1 = require("../../../constants/db.messages.constants");
var customer_base_modal_component_1 = require("./customer.base.modal.component");
var CustomerAddModalComponent = /** @class */ (function (_super) {
    __extends(CustomerAddModalComponent, _super);
    function CustomerAddModalComponent($uibModalInstance, customerService, $translate, customer) {
        var _this = _super.call(this, $uibModalInstance, customer) || this;
        _this.customerService = customerService;
        _this.$translate = $translate;
        _this.title = _this.$translate.instant('ADD_CUSTOMER');
        _this.id = _this.$translate.instant('NEW');
        return _this;
    }
    CustomerAddModalComponent.prototype.save = function (valid) {
        var _this = this;
        this.alertHelper.clear();
        if (valid) {
            this.isSaveInProcess = true;
            var customer_1 = new customer_object_1.CustomerObject(null, this.name, this.phone, this.isDeleted);
            this.customerService.addCustomer(customer_1).then(function (dbMsg) {
                _this.isSaveInProcess = false;
                if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                    customer_1.id = dbMsg.data;
                    _this.$uibModalInstance.close(customer_1);
                }
                else if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_MYSQL_DUPLICATE_KEY) {
                    var msg = _this.$translate.instant('KEY_ALREADY_EXISTS_IN_SYSTEM');
                    _this.alertHelper.addAlert(alert_helper_1.AlertHelper.TYPE_DANGER, msg);
                }
                else {
                    //handle error
                }
            });
        }
    };
    return CustomerAddModalComponent;
}(customer_base_modal_component_1.CustomerBaseModalComponent));
var customerAddModalComponent = /** @class */ (function (_super) {
    __extends(customerAddModalComponent, _super);
    function customerAddModalComponent(customer) {
        if (customer === void 0) { customer = null; }
        var _this = _super.call(this, customer) || this;
        _this.controller = CustomerAddModalComponent;
        return _this;
    }
    return customerAddModalComponent;
}(customer_base_modal_component_1.CustomerBaseModalSettings));
exports.customerAddModalComponent = customerAddModalComponent;
//# sourceMappingURL=customer.add.modal.component.js.map
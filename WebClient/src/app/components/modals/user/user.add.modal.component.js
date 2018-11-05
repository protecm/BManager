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
var user_base_modal_component_1 = require("./user.base.modal.component");
var user_object_1 = require("../../../objects/user/user.object");
var db_messages_constants_1 = require("../../../constants/db.messages.constants");
var user_access_object_1 = require("../../../objects/user/user.access.object");
var UserAddModalComponent = /** @class */ (function (_super) {
    __extends(UserAddModalComponent, _super);
    function UserAddModalComponent($uibModalInstance, usersService, $translate, user) {
        var _this = _super.call(this, $uibModalInstance, user) || this;
        _this.usersService = usersService;
        _this.$translate = $translate;
        _this.isEditMode = false;
        _this.isEditPassword = true;
        _this.title = _this.$translate.instant('ADD_USER');
        _this.id = _this.$translate.instant('NEW');
        return _this;
    }
    UserAddModalComponent.prototype.save = function (valid) {
        var _this = this;
        this.alertHelper.clear();
        if (valid) {
            this.isSaveInProcess = true;
            var newUserAccess = new user_access_object_1.UserAccessObject(this.userAccess.accessHome, this.userAccess.accessProducts, this.userAccess.accessCustomers, this.userAccess.accessOrders, this.userAccess.accessMonitor, this.userAccess.accessDeliveries, this.userAccess.accessReports, this.userAccess.accessSystem);
            var newUser_1 = new user_object_1.UserObject(null, this.username, this.password, newUserAccess, this.isDeleted);
            this.usersService.addUser(newUser_1).then(function (dbMsg) {
                _this.isSaveInProcess = false;
                if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                    newUser_1 = new user_object_1.UserObject(dbMsg.data, newUser_1.username, '', newUser_1.userAccess, newUser_1.isDeleted);
                    _this.$uibModalInstance.close(newUser_1);
                }
                else {
                    //handle error
                }
            });
        }
    };
    return UserAddModalComponent;
}(user_base_modal_component_1.UserBaseModalComponent));
var userAddModalComponent = /** @class */ (function (_super) {
    __extends(userAddModalComponent, _super);
    function userAddModalComponent(user) {
        if (user === void 0) { user = null; }
        var _this = _super.call(this, user) || this;
        _this.controller = UserAddModalComponent;
        return _this;
    }
    return userAddModalComponent;
}(user_base_modal_component_1.UserBaseModalSettings));
exports.userAddModalComponent = userAddModalComponent;
//# sourceMappingURL=user.add.modal.component.js.map
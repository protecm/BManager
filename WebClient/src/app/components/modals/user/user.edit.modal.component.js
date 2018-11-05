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
var UserEditModalComponent = /** @class */ (function (_super) {
    __extends(UserEditModalComponent, _super);
    function UserEditModalComponent($uibModalInstance, usersService, $translate, user) {
        var _this = _super.call(this, $uibModalInstance, user) || this;
        _this.usersService = usersService;
        _this.$translate = $translate;
        _this.isEditMode = true;
        _this.isEditPassword = false;
        _this.title = _this.$translate.instant('EDIT_USER');
        return _this;
    }
    UserEditModalComponent.prototype.save = function (valid) {
        var _this = this;
        this.alertHelper.clear();
        if (valid) {
            this.isSaveInProcess = true;
            var editedUserAccess = new user_access_object_1.UserAccessObject(this.userAccess.accessHome, this.userAccess.accessProducts, this.userAccess.accessCustomers, this.userAccess.accessOrders, this.userAccess.accessMonitor, this.userAccess.accessDeliveries, this.userAccess.accessReports, this.userAccess.accessSystem);
            var password = this.isEditPassword ? this.password : '';
            var editedUser_1 = new user_object_1.UserObject(this.id, this.username, password, editedUserAccess, this.isDeleted);
            this.usersService.editUser(this.user, editedUser_1).then(function (dbMsg) {
                _this.isSaveInProcess = false;
                if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                    editedUser_1 = new user_object_1.UserObject(editedUser_1.id, editedUser_1.username, '', editedUser_1.userAccess, editedUser_1.isDeleted);
                    _this.$uibModalInstance.close(editedUser_1);
                }
                else {
                    //handle error
                }
            });
        }
    };
    return UserEditModalComponent;
}(user_base_modal_component_1.UserBaseModalComponent));
var userEditModalComponent = /** @class */ (function (_super) {
    __extends(userEditModalComponent, _super);
    function userEditModalComponent(user) {
        var _this = _super.call(this, user) || this;
        _this.controller = UserEditModalComponent;
        return _this;
    }
    return userEditModalComponent;
}(user_base_modal_component_1.UserBaseModalSettings));
exports.userEditModalComponent = userEditModalComponent;
//# sourceMappingURL=user.edit.modal.component.js.map
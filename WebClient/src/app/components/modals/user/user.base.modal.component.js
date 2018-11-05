"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_helper_1 = require("../../../helpers/alert.helper");
var user_access_object_1 = require("../../../objects/user/user.access.object");
var UserBaseModalComponent = /** @class */ (function () {
    function UserBaseModalComponent($uibModalInstance, user) {
        this.$uibModalInstance = $uibModalInstance;
        this.user = user;
        if (this.user) {
            this.id = this.user.id;
            this.username = this.user.username;
            this.password = this.user.password;
            this.passwordConfirm = this.user.password;
            this.userAccess = this.user.userAccess.getObject();
            this.isDeleted = this.user.isDeleted;
        }
        else {
            this.password = '';
            this.passwordConfirm = '';
            this.userAccess = user_access_object_1.UserAccessObject.CreateInstance().getObject();
            this.isDeleted = false;
        }
        this.alertHelper = new alert_helper_1.AlertHelper();
    }
    UserBaseModalComponent.prototype.cancel = function () {
        this.$uibModalInstance.dismiss();
    };
    return UserBaseModalComponent;
}());
exports.UserBaseModalComponent = UserBaseModalComponent;
var UserBaseModalSettings = /** @class */ (function () {
    function UserBaseModalSettings(user) {
        this.animation = true;
        this.backdrop = 'static';
        this.controller = UserBaseModalComponent;
        this.bindToController = true;
        this.controllerAs = 'vm';
        this.templateUrl = 'app/templates/modals/user.modal.template.html';
        this.resolve = {
            user: function () { return user; }
        };
    }
    return UserBaseModalSettings;
}());
exports.UserBaseModalSettings = UserBaseModalSettings;
//# sourceMappingURL=user.base.modal.component.js.map
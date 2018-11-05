"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_edit_modal_component_1 = require("../../modals/user/user.edit.modal.component");
var db_messages_constants_1 = require("../../../constants/db.messages.constants");
var user_filter_object_1 = require("../../../objects/user/user.filter.object");
var user_add_modal_component_1 = require("../../modals/user/user.add.modal.component");
var UsersTabComponent = /** @class */ (function () {
    function UsersTabComponent(usersService, confirmationService, $translate, modalService, toastService) {
        this.usersService = usersService;
        this.confirmationService = confirmationService;
        this.$translate = $translate;
        this.modalService = modalService;
        this.toastService = toastService;
        this.isDeleteInProcess = {};
        var activeUsersFilter = user_filter_object_1.UserFilterObject.GetActiveUsersFilter();
        this.getUsersFromServer(activeUsersFilter);
    }
    UsersTabComponent.prototype.createUser = function () {
        var _this = this;
        var options = new user_add_modal_component_1.userAddModalComponent();
        this.modalService.showModal(options)
            .then(function (data) {
            if (data) {
                //user added
                _this.addUser(data);
                _this.toastService.showSuccess('CREATED_SUCCESSFULLY', 'USER');
            }
        }, function (error) {
            //handle error/dismiss
        });
    };
    UsersTabComponent.prototype.editUser = function (user) {
        var _this = this;
        var options = new user_edit_modal_component_1.userEditModalComponent(user);
        this.modalService.showModal(options)
            .then(function (data) {
            if (data) {
                //user edited
                _this.updateUser(user, data);
            }
        }, function (error) {
            //handle error/dismiss
        });
    };
    UsersTabComponent.prototype.addUser = function (user) {
        this.users.push(user);
    };
    UsersTabComponent.prototype.updateUser = function (orgUser, edtUser) {
        var len = this.users.length;
        for (var i = 0; i < len; i++) {
            if (this.users[i].id === orgUser.id) {
                this.users[i] = edtUser;
                break;
            }
        }
    };
    UsersTabComponent.prototype.deleteUserRequest = function (user) {
        var _this = this;
        var title = this.$translate.instant('DELETE_USER');
        var bodyMsg = this.confirmationService.getDefaultBodyTemplate(this.$translate.instant('CONFIRM_DELETE_USER'), user.username);
        this.confirmationService.confirm(title, bodyMsg)
            .then(function (result) {
            if (result) {
                _this.deleteUser(user);
            }
        }, function (error) {
            //handle error/dismiss
        });
    };
    UsersTabComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.isDeleteInProcess[user.id] = true;
        this.usersService.deleteUser(user)
            .then(function (dbMsg) {
            if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                //user deleted
                user.isDeleted = true;
                _this.removeUser(user);
                _this.toastService.showSuccess('DELETED_SUCCESSFULLY', 'USER');
            }
            else {
                //handle error
            }
            _this.isDeleteInProcess[user.id] = false;
        });
    };
    UsersTabComponent.prototype.removeUser = function (user) {
        var len = this.users.length;
        for (var i = 0; i < len; i++) {
            if (this.users[i].id === user.id) {
                this.users.splice(i, 1);
                break;
            }
        }
    };
    UsersTabComponent.prototype.getUsersFromServer = function (filter) {
        var _this = this;
        this.usersService.getUsers(filter)
            .then(function (data) {
            _this.users = data;
        });
    };
    return UsersTabComponent;
}());
exports.usersTabComponent = {
    controller: UsersTabComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/tabs/users.tab.template.html'
};
//# sourceMappingURL=users.tab.component.js.map
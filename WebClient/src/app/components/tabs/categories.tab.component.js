"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var category_add_modal_component_1 = require("../modals/category/category.add.modal.component");
var category_edit_modal_component_1 = require("../modals/category/category.edit.modal.component");
var db_messages_constants_1 = require("../../constants/db.messages.constants");
var CategoriesTabComponent = /** @class */ (function () {
    function CategoriesTabComponent(modalService, categoryService, confirmationService, $translate, toastService) {
        this.modalService = modalService;
        this.categoryService = categoryService;
        this.confirmationService = confirmationService;
        this.$translate = $translate;
        this.toastService = toastService;
        this.isDeleteInProcess = {};
        this.getCategoriesFromServer();
    }
    CategoriesTabComponent.prototype.createCategory = function () {
        var _this = this;
        var options = new category_add_modal_component_1.categoryAddModalComponent();
        this.modalService.showModal(options)
            .then(function (data) {
            if (data) {
                //New category created
                _this.addCategory(data);
                _this.toastService.showSuccess('CREATED_SUCCESSFULLY', 'CATEGORY');
            }
        }, function (error) {
            //handle error/dismiss
        });
    };
    CategoriesTabComponent.prototype.deleteCategoryRequest = function (category) {
        var _this = this;
        var title = this.$translate.instant('DELETE_CATEGORY');
        var bodyMsg = this.confirmationService.getDefaultBodyTemplate(this.$translate.instant('CONFIRM_DELETE_CATEGORY'), category.name);
        this.confirmationService.confirm(title, bodyMsg)
            .then(function (result) {
            if (result) {
                _this.deleteCategory(category);
            }
        }, function (error) {
            //handle error/dismiss
        });
    };
    CategoriesTabComponent.prototype.deleteCategory = function (category) {
        var _this = this;
        this.isDeleteInProcess[category.id] = true;
        this.categoryService.deleteCategory(category)
            .then(function (dbMsg) {
            if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                //category deleted
                category.isDeleted = true;
                _this.removeCategory(category);
                _this.toastService.showSuccess('DELETED_SUCCESSFULLY', 'CATEGORY');
            }
            else {
                //handle error
            }
            _this.isDeleteInProcess[category.id] = false;
        });
    };
    CategoriesTabComponent.prototype.editCategory = function (category) {
        var _this = this;
        var options = new category_edit_modal_component_1.categoryEditModalComponent(category);
        this.modalService.showModal(options)
            .then(function (data) {
            if (data) {
                //category edited
                _this.updateCategory(category, data);
            }
        }, function (error) {
            //handle error/dismiss
        });
    };
    CategoriesTabComponent.prototype.getCategoriesFromServer = function () {
        var _this = this;
        this.categoryService.getCategories()
            .then(function (data) {
            _this.categories = data;
        });
    };
    CategoriesTabComponent.prototype.addCategory = function (category) {
        this.categories.push(category);
    };
    CategoriesTabComponent.prototype.updateCategory = function (orgCategory, edtCategory) {
        var len = this.categories.length;
        for (var i = 0; i < len; i++) {
            if (this.categories[i].id === orgCategory.id) {
                this.categories[i] = edtCategory;
                break;
            }
        }
    };
    CategoriesTabComponent.prototype.removeCategory = function (category) {
        var len = this.categories.length;
        for (var i = 0; i < len; i++) {
            if (this.categories[i].id === category.id) {
                this.categories.splice(i, 1);
                break;
            }
        }
    };
    CategoriesTabComponent.prototype.$onInit = function () {
        var _this = this;
        this.categoryService.registerListener(this.tabIndex, function () {
            _this.getCategoriesFromServer();
        });
    };
    CategoriesTabComponent.prototype.$onDestroy = function () {
        this.categoryService.removeListener(this.tabIndex);
    };
    return CategoriesTabComponent;
}());
exports.categoriesTabComponent = {
    controller: CategoriesTabComponent,
    controllerAs: 'vm',
    bindings: {
        tabIndex: '<'
    },
    templateUrl: 'app/templates/tabs/categories.tab.template.html'
};
//# sourceMappingURL=categories.tab.component.js.map
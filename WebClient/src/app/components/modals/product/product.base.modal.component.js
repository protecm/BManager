"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_helper_1 = require("../../../helpers/alert.helper");
var category_object_1 = require("../../../objects/category.object");
var category_add_modal_component_1 = require("../category/category.add.modal.component");
var ProductBaseModalComponent = /** @class */ (function () {
    function ProductBaseModalComponent($uibModalInstance, modalService, categoryService, toastService, product) {
        var _this = this;
        this.$uibModalInstance = $uibModalInstance;
        this.modalService = modalService;
        this.categoryService = categoryService;
        this.toastService = toastService;
        this.product = product;
        if (this.product) {
            this.id = this.product.id;
            this.name = this.product.name;
            this.isDeleted = this.product.isDeleted;
        }
        else {
            this.isDeleted = false;
        }
        this.getCategoriesFromServer()
            .then(function (data) {
            if (_this.product) {
                _this.selectedCategory = _this.product.category;
            }
        });
        this.alertHelper = new alert_helper_1.AlertHelper();
    }
    ProductBaseModalComponent.prototype.createCategory = function (uiSelectController, categoryName) {
        var _this = this;
        var category = new category_object_1.CategoryObject(null, categoryName, false);
        var options = new category_add_modal_component_1.categoryAddModalComponent(category);
        return this.modalService.showModal(options)
            .then(function (data) {
            if (data) {
                //New category created
                _this.categories.push(data);
                _this.selectedCategory = data;
                uiSelectController.close(); // ui-select controller
                _this.toastService.showSuccess('CREATED_SUCCESSFULLY', 'CATEGORY');
            }
            return true;
        }, function (error) {
            //handle error/dismiss
            return false;
        });
    };
    ProductBaseModalComponent.prototype.cancel = function () {
        this.$uibModalInstance.dismiss();
    };
    ProductBaseModalComponent.prototype.getCategoriesFromServer = function () {
        var _this = this;
        return this.categoryService.getCategories()
            .then(function (data) {
            return _this.categories = data;
        });
    };
    return ProductBaseModalComponent;
}());
exports.ProductBaseModalComponent = ProductBaseModalComponent;
var ProductBaseModalSettings = /** @class */ (function () {
    function ProductBaseModalSettings(product) {
        this.animation = true;
        this.backdrop = 'static';
        this.controller = ProductBaseModalComponent;
        this.bindToController = true;
        this.controllerAs = 'vm';
        this.templateUrl = 'app/templates/modals/product.modal.template.html';
        this.resolve = {
            product: function () { return product; }
        };
    }
    return ProductBaseModalSettings;
}());
exports.ProductBaseModalSettings = ProductBaseModalSettings;
//# sourceMappingURL=product.base.modal.component.js.map
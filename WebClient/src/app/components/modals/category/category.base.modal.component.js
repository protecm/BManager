"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_helper_1 = require("../../../helpers/alert.helper");
var CategoryBaseModalComponent = /** @class */ (function () {
    function CategoryBaseModalComponent($uibModalInstance, category) {
        this.$uibModalInstance = $uibModalInstance;
        this.category = category;
        if (this.category) {
            this.id = this.category.id;
            this.name = this.category.name;
            this.isDeleted = this.category.isDeleted;
        }
        else {
            this.isDeleted = false;
        }
        this.alertHelper = new alert_helper_1.AlertHelper();
    }
    CategoryBaseModalComponent.prototype.cancel = function () {
        this.$uibModalInstance.dismiss();
    };
    return CategoryBaseModalComponent;
}());
exports.CategoryBaseModalComponent = CategoryBaseModalComponent;
var CategoryBaseModalSettings = /** @class */ (function () {
    function CategoryBaseModalSettings(category) {
        this.animation = true;
        this.backdrop = 'static';
        this.controller = CategoryBaseModalComponent;
        this.bindToController = true;
        this.controllerAs = 'vm';
        this.templateUrl = 'app/templates/modals/category.modal.template.html';
        this.resolve = {
            category: function () { return category; }
        };
    }
    return CategoryBaseModalSettings;
}());
exports.CategoryBaseModalSettings = CategoryBaseModalSettings;
//# sourceMappingURL=category.base.modal.component.js.map
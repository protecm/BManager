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
var category_object_1 = require("../../../objects/category.object");
var db_messages_constants_1 = require("../../../constants/db.messages.constants");
var alert_helper_1 = require("../../../helpers/alert.helper");
var category_base_modal_component_1 = require("./category.base.modal.component");
var CategoryEditModalComponent = /** @class */ (function (_super) {
    __extends(CategoryEditModalComponent, _super);
    function CategoryEditModalComponent($uibModalInstance, categoryService, $translate, category) {
        var _this = _super.call(this, $uibModalInstance, category) || this;
        _this.categoryService = categoryService;
        _this.$translate = $translate;
        _this.title = _this.$translate.instant('EDIT_CATEGORY');
        return _this;
    }
    CategoryEditModalComponent.prototype.save = function (valid) {
        var _this = this;
        this.alertHelper.clear();
        if (valid) {
            this.isSaveInProcess = true;
            var editedCategory_1 = new category_object_1.CategoryObject(this.id, this.name, this.isDeleted);
            this.categoryService.editCategory(this.category, editedCategory_1).then(function (dbMsg) {
                _this.isSaveInProcess = false;
                if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                    _this.$uibModalInstance.close(editedCategory_1);
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
    return CategoryEditModalComponent;
}(category_base_modal_component_1.CategoryBaseModalComponent));
var categoryEditModalComponent = /** @class */ (function (_super) {
    __extends(categoryEditModalComponent, _super);
    function categoryEditModalComponent(category) {
        var _this = _super.call(this, category) || this;
        _this.controller = CategoryEditModalComponent;
        return _this;
    }
    return categoryEditModalComponent;
}(category_base_modal_component_1.CategoryBaseModalSettings));
exports.categoryEditModalComponent = categoryEditModalComponent;
//# sourceMappingURL=category.edit.modal.component.js.map
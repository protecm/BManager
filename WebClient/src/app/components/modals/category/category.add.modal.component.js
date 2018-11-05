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
var CategoryAddModalComponent = /** @class */ (function (_super) {
    __extends(CategoryAddModalComponent, _super);
    function CategoryAddModalComponent($uibModalInstance, categoryService, $translate, category) {
        var _this = _super.call(this, $uibModalInstance, category) || this;
        _this.categoryService = categoryService;
        _this.$translate = $translate;
        _this.title = _this.$translate.instant('ADD_CATEGORY');
        _this.id = _this.$translate.instant('NEW');
        return _this;
    }
    CategoryAddModalComponent.prototype.save = function (valid) {
        var _this = this;
        this.alertHelper.clear();
        if (valid) {
            this.isSaveInProcess = true;
            var category_1 = new category_object_1.CategoryObject(null, this.name, this.isDeleted);
            this.categoryService.addCategory(category_1).then(function (dbMsg) {
                _this.isSaveInProcess = false;
                if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                    category_1.id = dbMsg.data;
                    _this.$uibModalInstance.close(category_1);
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
    return CategoryAddModalComponent;
}(category_base_modal_component_1.CategoryBaseModalComponent));
var categoryAddModalComponent = /** @class */ (function (_super) {
    __extends(categoryAddModalComponent, _super);
    function categoryAddModalComponent(category) {
        if (category === void 0) { category = null; }
        var _this = _super.call(this, category) || this;
        _this.controller = CategoryAddModalComponent;
        return _this;
    }
    return categoryAddModalComponent;
}(category_base_modal_component_1.CategoryBaseModalSettings));
exports.categoryAddModalComponent = categoryAddModalComponent;
//# sourceMappingURL=category.add.modal.component.js.map
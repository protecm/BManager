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
var product_object_1 = require("../../../objects/product/product.object");
var db_messages_constants_1 = require("../../../constants/db.messages.constants");
var alert_helper_1 = require("../../../helpers/alert.helper");
var product_base_modal_component_1 = require("./product.base.modal.component");
var ProductEditModalComponent = /** @class */ (function (_super) {
    __extends(ProductEditModalComponent, _super);
    function ProductEditModalComponent($uibModalInstance, modalService, categoryService, toastService, productService, $translate, product) {
        var _this = _super.call(this, $uibModalInstance, modalService, categoryService, toastService, product) || this;
        _this.productService = productService;
        _this.$translate = $translate;
        _this.title = _this.$translate.instant('EDIT_PRODUCT');
        return _this;
    }
    ProductEditModalComponent.prototype.save = function (valid) {
        var _this = this;
        this.alertHelper.clear();
        if (valid) {
            this.isSaveInProcess = true;
            var editedProduct_1 = new product_object_1.ProductObject(this.id, this.selectedCategory, this.name, this.isDeleted);
            this.productService.editProduct(this.product, editedProduct_1).then(function (dbMsg) {
                _this.isSaveInProcess = false;
                if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                    _this.$uibModalInstance.close(editedProduct_1);
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
    return ProductEditModalComponent;
}(product_base_modal_component_1.ProductBaseModalComponent));
var productEditModalComponent = /** @class */ (function (_super) {
    __extends(productEditModalComponent, _super);
    function productEditModalComponent(product) {
        var _this = _super.call(this, product) || this;
        _this.controller = ProductEditModalComponent;
        return _this;
    }
    return productEditModalComponent;
}(product_base_modal_component_1.ProductBaseModalSettings));
exports.productEditModalComponent = productEditModalComponent;
//# sourceMappingURL=product.edit.modal.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_add_modal_component_1 = require("../modals/product/product.add.modal.component");
var product_edit_modal_component_1 = require("../modals/product/product.edit.modal.component");
var db_messages_constants_1 = require("../../constants/db.messages.constants");
var product_filter_object_1 = require("../../objects/product/product.filter.object");
var ProductsTabComponent = /** @class */ (function () {
    function ProductsTabComponent(modalService, productService, confirmationService, $translate, toastService) {
        var _this = this;
        this.modalService = modalService;
        this.productService = productService;
        this.confirmationService = confirmationService;
        this.$translate = $translate;
        this.toastService = toastService;
        this.deleteProductRequest = function (product) {
            var title = _this.$translate.instant('DELETE_PRODUCT');
            var bodyMsg = _this.confirmationService.getDefaultBodyTemplate(_this.$translate.instant('CONFIRM_DELETE_PRODUCT'), product.name);
            return _this.confirmationService.confirm(title, bodyMsg)
                .then(function (result) {
                if (result) {
                    return _this.deleteProduct(product);
                }
            }, function (error) {
                //handle error/dismiss
            });
        };
        this.editProduct = function (product) {
            var options = new product_edit_modal_component_1.productEditModalComponent(product);
            return _this.modalService.showModal(options)
                .then(function (data) {
                if (data) {
                    //product edited
                    _this.updateProduct(product, data);
                }
            }, function (error) {
                //handle error/dismiss
            });
        };
        this.getProductsFromServer();
    }
    ProductsTabComponent.prototype.createProduct = function () {
        var _this = this;
        var options = new product_add_modal_component_1.productAddModalComponent();
        this.modalService.showModal(options)
            .then(function (data) {
            if (data) {
                //New product created
                _this.addProduct(data);
                _this.toastService.showSuccess('CREATED_SUCCESSFULLY', 'PRODUCT');
            }
        }, function (error) {
            //handle error/dismiss
        });
    };
    ProductsTabComponent.prototype.deleteProduct = function (product) {
        var _this = this;
        return this.productService.deleteProduct(product)
            .then(function (dbMsg) {
            if (dbMsg.code === db_messages_constants_1.DbMessagesConstants.CODE_OK) {
                //category deleted
                product.isDeleted = true;
                _this.removeProduct(product);
                _this.toastService.showSuccess('DELETED_SUCCESSFULLY', 'PRODUCT');
            }
            else {
                //handle error
            }
        });
    };
    ProductsTabComponent.prototype.getProductsFromServer = function () {
        var _this = this;
        this.productService.getProducts(product_filter_object_1.ProductFilterObject.GetActiveProductsFilter())
            .then(function (data) {
            _this.products = data;
        });
    };
    ProductsTabComponent.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    ProductsTabComponent.prototype.updateProduct = function (orgProduct, edtProduct) {
        var len = this.products.length;
        for (var i = 0; i < len; i++) {
            if (this.products[i].id === orgProduct.id) {
                this.products[i] = edtProduct;
                break;
            }
        }
    };
    ProductsTabComponent.prototype.removeProduct = function (product) {
        var len = this.products.length;
        for (var i = 0; i < len; i++) {
            if (this.products[i].id === product.id) {
                this.products.splice(i, 1);
                break;
            }
        }
    };
    ProductsTabComponent.prototype.$onInit = function () {
        var _this = this;
        this.productService.registerListener(this.tabIndex, function () {
            _this.getProductsFromServer();
        });
    };
    ProductsTabComponent.prototype.$onDestroy = function () {
        this.productService.removeListener(this.tabIndex);
    };
    return ProductsTabComponent;
}());
exports.productsTabComponent = {
    controller: ProductsTabComponent,
    controllerAs: 'vm',
    bindings: {
        tabIndex: '<'
    },
    templateUrl: 'app/templates/tabs/products.tab.template.html'
};
//# sourceMappingURL=products.tab.component.js.map
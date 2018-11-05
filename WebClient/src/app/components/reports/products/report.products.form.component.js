"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report_constants_1 = require("../../../constants/report.constants");
var product_filter_object_1 = require("../../../objects/product/product.filter.object");
var ReportProductsFormComponent = /** @class */ (function () {
    function ReportProductsFormComponent(categoryService, productService) {
        this.categoryService = categoryService;
        this.productService = productService;
        this.getCategoriesFromServer();
    }
    Object.defineProperty(ReportProductsFormComponent.prototype, "type", {
        get: function () {
            return report_constants_1.ReportConstants.TYPE_PRODUCTS;
        },
        enumerable: true,
        configurable: true
    });
    ReportProductsFormComponent.prototype.generate = function () {
        var _this = this;
        this.isGenerateInProcess = true;
        this.productName = this.productName ? this.productName : '';
        var filter = new product_filter_object_1.ProductFilterObject(this.productName, this.selectedCategory, false);
        return this.getProductsFromServer(filter)
            .then(function (data) {
            _this.isGenerateInProcess = false;
            return {
                data: data,
                settings: null
            };
        });
    };
    ReportProductsFormComponent.prototype.getCategoriesFromServer = function () {
        var _this = this;
        this.categoryService.getCategories()
            .then(function (data) {
            _this.categories = data;
        });
    };
    ReportProductsFormComponent.prototype.getProductsFromServer = function (filter) {
        return this.productService.getProducts(filter);
    };
    ReportProductsFormComponent.prototype.$onInit = function () {
        if (this.parent) {
            this.parent.registerFormCtrl(this);
        }
    };
    ReportProductsFormComponent.prototype.$onDestroy = function () {
    };
    return ReportProductsFormComponent;
}());
exports.reportProductsFormComponent = {
    controller: ReportProductsFormComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    templateUrl: 'app/templates/reports/report.products.form.template.html'
};
//# sourceMappingURL=report.products.form.component.js.map
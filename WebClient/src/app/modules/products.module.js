"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var products_component_1 = require("../components/products.component");
var products_tab_component_1 = require("../components/tabs/products.tab.component");
var categories_tab_component_1 = require("../components/tabs/categories.tab.component");
var category_service_1 = require("../services/category.service");
var product_service_1 = require("../services/product.service");
var products_table_component_1 = require("../components/tables/products.table.component");
exports.productsModule = angular
    .module('productsModule', [])
    .component('productsTable', products_table_component_1.productsTableComponent)
    .component('productsView', products_component_1.productsComponent)
    .component('productsTabView', products_tab_component_1.productsTabComponent)
    .component('categoriesTabView', categories_tab_component_1.categoriesTabComponent)
    .service('categoryService', category_service_1.CategoryService)
    .service('productService', product_service_1.ProductService);
//# sourceMappingURL=products.module.js.map
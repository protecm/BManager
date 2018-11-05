import {IAngularStatic} from "angular";
import {productsComponent} from "../components/products.component";
import {productsTabComponent} from "../components/tabs/products.tab.component";
import {categoriesTabComponent} from "../components/tabs/categories.tab.component";
import {CategoryService} from "../services/category.service";
import {ProductService} from "../services/product.service";
import {productsTableComponent} from "../components/tables/products.table.component";

declare const angular:IAngularStatic;
export const productsModule = angular
    .module('productsModule',[])
    .component('productsTable',productsTableComponent)
    .component('productsView',productsComponent)
    .component('productsTabView',productsTabComponent)
    .component('categoriesTabView',categoriesTabComponent)
    .service('categoryService',CategoryService)
    .service('productService',ProductService);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseTableComponent = /** @class */ (function () {
    function BaseTableComponent() {
        this.isDeleteInProcess = {};
    }
    return BaseTableComponent;
}());
exports.BaseTableComponent = BaseTableComponent;
var BaseTableComponentOptions = /** @class */ (function () {
    function BaseTableComponentOptions(controller, templateUrl) {
        this.controllerAs = 'vm';
        this.bindings = {
            data: '<',
            showFilters: '<',
            showSorting: '<',
            sortProperty: '@',
            showActions: '<',
            onRowClick: '&?',
            onDeleteAction: '&?',
            tbodyStyle: '<'
        };
        this.controller = controller;
        this.templateUrl = templateUrl;
    }
    return BaseTableComponentOptions;
}());
exports.BaseTableComponentOptions = BaseTableComponentOptions;
//# sourceMappingURL=base.table.component.js.map
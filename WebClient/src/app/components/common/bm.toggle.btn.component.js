"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BmToggleBtnComponent = /** @class */ (function () {
    function BmToggleBtnComponent() {
    }
    BmToggleBtnComponent.prototype.toggle = function () {
        this.target.isSelected = !this.target.isSelected;
    };
    BmToggleBtnComponent.prototype.$onInit = function () {
    };
    return BmToggleBtnComponent;
}());
exports.bmToggleBtnComponent = {
    controller: BmToggleBtnComponent,
    controllerAs: 'vm',
    bindings: {
        target: '<'
    },
    template: "<button type=\"button\" style=\"margin: 3px;\" class=\"btn\" ng-class=\"'btn-'+(vm.target.isSelected?'info':'default')\" \n                ng-click=\"vm.toggle()\">\n                    {{vm.target.msg}}\n                </button>"
};
//# sourceMappingURL=bm.toggle.btn.component.js.map
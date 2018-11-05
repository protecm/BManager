"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BmBadgeComponent = /** @class */ (function () {
    function BmBadgeComponent() {
    }
    return BmBadgeComponent;
}());
exports.bmBadgeComponent = {
    controller: BmBadgeComponent,
    controllerAs: 'vm',
    bindings: {
        type: '@',
        msg: '<'
    },
    template: "<span class=\"badge\" ng-class=\"'badge-' + (vm.type || 'danger')\" ng-bind=\"vm.msg\" ng-if=\"vm.msg\">\n               </span>"
};
//# sourceMappingURL=bm.badge.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var access_level_constants_1 = require("../constants/access.level.constants");
var RestrictedDirective = /** @class */ (function () {
    function RestrictedDirective(permService) {
        this.permService = permService;
        this.restrict = 'A';
        this.scope = true;
        this.bindToController = true;
        this.controllerAs = "vm";
    }
    RestrictedDirective.prototype.link = function (scope, elem, attrs) {
        var myName = exports.restrictedDirective.name;
        var permName = attrs[myName];
        var result = this.isViewRestricted(permName);
        if (result) {
            elem.remove();
        }
    };
    RestrictedDirective.prototype.isViewRestricted = function (permName) {
        return !this.permService.userHasPermission(permName, access_level_constants_1.AccessLevelConstants.ACCESS_VIEW);
    };
    return RestrictedDirective;
}());
exports.restrictedDirective = {
    name: 'restrictedView',
    directive: function (permService) {
        return new RestrictedDirective(permService);
    },
    $inject: ['permService']
};
//# sourceMappingURL=restricted.directive.js.map
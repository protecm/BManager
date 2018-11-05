"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PermissionsService = /** @class */ (function () {
    function PermissionsService(authenticationService) {
        this.authenticationService = authenticationService;
    }
    PermissionsService.prototype.userHasPermission = function (permName, accessLevel) {
        if (this.authenticationService.credentials.user.userAccess) {
            return this.userHasPermissionImpl(permName, accessLevel);
        }
        return false;
    };
    PermissionsService.prototype.userHasPermissionImpl = function (permName, accessLevel) {
        return this.authenticationService.credentials.user.userAccess[permName] ?
            (this.authenticationService.credentials.user.userAccess[permName] >= accessLevel) : false;
    };
    return PermissionsService;
}());
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map
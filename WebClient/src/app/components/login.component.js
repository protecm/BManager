"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_object_1 = require("../objects/user/user.object");
var router_state_constants_1 = require("../constants/router.state.constants");
var access_level_constants_1 = require("../constants/access.level.constants");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, confService, permService, modalService, $translate, $state) {
        this.loginService = loginService;
        this.confService = confService;
        this.permService = permService;
        this.modalService = modalService;
        this.$translate = $translate;
        this.$state = $state;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isLoginInProcess = true;
        var user = new user_object_1.UserObject(null, this.username, this.password, null, false);
        this.loginService.login(user)
            .then(function (status) {
            if (status) {
                _this.loadConfigurationFromServer();
            }
            else {
                _this.isLoginInProcess = false;
                _this.showLoginErrorMessage();
            }
        });
    };
    LoginComponent.prototype.loadConfigurationFromServer = function () {
        var _this = this;
        this.confService.loadConfiguration()
            .then(function (status) {
            _this.isLoginInProcess = false;
            if (status) {
                _this.redirectToHomeView();
            }
            else {
                //  Error getting configurations
            }
        });
    };
    LoginComponent.prototype.redirectToHomeView = function () {
        var homeState; //homeState is the first accessible state
        var states = router_state_constants_1.RouterStateConstants.STATES;
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (this.permService.userHasPermission(state.permission, access_level_constants_1.AccessLevelConstants.ACCESS_VIEW)) {
                homeState = state;
                break;
            }
        }
        if (homeState) {
            this.$state.go(homeState.name);
        }
        else {
            //TODO - add 'emptyHome' state to constants
            this.$state.go('emptyHome');
        }
    };
    LoginComponent.prototype.showLoginErrorMessage = function () {
        var title = this.$translate.instant('LOGIN_FAILED');
        var msg = this.$translate.instant('USER_OR_PASSWORD_INCORRECT');
        this.modalService.showErrorMessage(title, msg);
    };
    return LoginComponent;
}());
exports.loginComponent = {
    controller: LoginComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/login.template.html'
};
//# sourceMappingURL=login.component.js.map
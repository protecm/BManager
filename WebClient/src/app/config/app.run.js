"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var languages_constants_1 = require("../constants/languages.constants");
function AppRun(loginService, $rootScope, $state, languageService) {
    /* Get language from preferences and configure it */
    languageService.language = languages_constants_1.LanguagesConstants.DEFAULT_LANGUAGE;
    /* Watch routing state and login status */
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if ((toState.name !== 'login') && (!loginService.isLoggedIn)) {
            event.preventDefault();
            $state.go('login');
        }
        else if (toState.name === 'login') {
            loginService.logout();
        }
        else {
            //TODO - check permissions for view...
        }
    });
}
exports.AppRun = AppRun;
//# sourceMappingURL=app.run.js.map
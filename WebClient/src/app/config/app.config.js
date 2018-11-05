"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var languages_constants_1 = require("../constants/languages.constants");
var router_state_constants_1 = require("../constants/router.state.constants");
function AppConfig($locationProvider, $translateProvider, $stateProvider, $urlRouterProvider, toastrConfig) {
    //$locationProvider.html5Mode(true);  // https://docs.angularjs.org/api/ng/provider/$locationProvider
    /* Angular Translate */
    TranslateConfig($translateProvider);
    /* Angular UI Router */
    RouterConfig($stateProvider, $urlRouterProvider);
    /* Angular Toastr */
    ToastrConfig(toastrConfig);
}
exports.AppConfig = AppConfig;
function TranslateConfig($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useStaticFilesLoader({
        prefix: 'app/languages/lang-',
        suffix: '.json'
    });
    var defaultLanguageCode = languages_constants_1.LanguagesConstants.DEFAULT_LANGUAGE.code;
    $translateProvider.preferredLanguage(defaultLanguageCode);
    $translateProvider.fallbackLanguage(defaultLanguageCode);
}
function RouterConfig($stateProvider, $urlRouterProvider) {
    //TODO - add states to constants class...
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state({
        name: 'login',
        url: '/login',
        template: '<login-view></login-view>'
    })
        .state({
        name: 'emptyHome',
        url: '/emptyHome',
        template: "\n            <div>\n                {{ 'ALL_VIEWS_RESTRICTED_MSG' | translate }}\n            </div>\n            "
    })
        .state({
        abstract: true,
        name: 'main',
        url: '/main',
        template: '<nav-view></nav-view>'
    })
        .state(router_state_constants_1.RouterStateConstants.STATE_HOME)
        .state(router_state_constants_1.RouterStateConstants.STATE_PRODUCTS)
        .state(router_state_constants_1.RouterStateConstants.STATE_CUSTOMERS)
        .state(router_state_constants_1.RouterStateConstants.STATE_ORDERS)
        .state(router_state_constants_1.RouterStateConstants.STATE_MONITOR)
        .state(router_state_constants_1.RouterStateConstants.STATE_DELIVERIES)
        .state(router_state_constants_1.RouterStateConstants.STATE_REPORTS)
        .state(router_state_constants_1.RouterStateConstants.STATE_SYSTEM);
}
function ToastrConfig(toastrConfig) {
    toastrConfig.maxOpened = 3;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-bottom-full-width';
}
//# sourceMappingURL=app.config.js.map
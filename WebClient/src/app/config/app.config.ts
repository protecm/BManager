import {ILocationProvider} from "angular";
import {IStateProvider,IUrlRouterProvider} from "angular-ui-router";
import {LanguagesConstants} from "../constants/languages.constants";
import {IToastrConfig} from "angular-toastr";
import {RouterStateConstants} from "../constants/router.state.constants";

export function AppConfig($locationProvider:ILocationProvider,
                          $translateProvider:angular.translate.ITranslateProvider,
                          $stateProvider:IStateProvider,
                          $urlRouterProvider:IUrlRouterProvider,
                          toastrConfig:IToastrConfig) {
    //$locationProvider.html5Mode(true);  // https://docs.angularjs.org/api/ng/provider/$locationProvider

    /* Angular Translate */
    TranslateConfig($translateProvider);

    /* Angular UI Router */
    RouterConfig($stateProvider,$urlRouterProvider);

    /* Angular Toastr */
    ToastrConfig(toastrConfig);
}

function TranslateConfig( $translateProvider:angular.translate.ITranslateProvider) {
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useStaticFilesLoader({
        prefix: 'app/languages/lang-',
        suffix: '.json'
    });

    const defaultLanguageCode = LanguagesConstants.DEFAULT_LANGUAGE.code;
    $translateProvider.preferredLanguage(defaultLanguageCode);
    $translateProvider.fallbackLanguage(defaultLanguageCode);
}

function RouterConfig($stateProvider:IStateProvider,$urlRouterProvider:IUrlRouterProvider) {
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
            template: `
            <div>
                {{ 'ALL_VIEWS_RESTRICTED_MSG' | translate }}
            </div>
            `
        })
        .state({
            abstract: true,
            name: 'main',
            url: '/main',
            template: '<nav-view></nav-view>'
        })
        .state( RouterStateConstants.STATE_HOME )
        .state( RouterStateConstants.STATE_PRODUCTS )
        .state( RouterStateConstants.STATE_CUSTOMERS )
        .state( RouterStateConstants.STATE_ORDERS )
        .state( RouterStateConstants.STATE_MONITOR )
        .state( RouterStateConstants.STATE_DELIVERIES )
        .state( RouterStateConstants.STATE_REPORTS )
        .state( RouterStateConstants.STATE_SYSTEM );
}

function ToastrConfig(toastrConfig:IToastrConfig) {
    toastrConfig.maxOpened = 3;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-bottom-full-width';
}
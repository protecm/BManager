import {IRootScopeService} from "angular";
import {IStateService} from "angular-ui-router";
import {LoginService} from "../services/login.service";
import {LanguageService} from "../services/language.service";
import {LanguagesConstants} from "../constants/languages.constants";

export function AppRun(loginService:LoginService, $rootScope:IRootScopeService, $state:IStateService, languageService:LanguageService) {

    /* Get language from preferences and configure it */
    languageService.language = LanguagesConstants.DEFAULT_LANGUAGE;

    /* Watch routing state and login status */
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if ( (toState.name !== 'login') && (!loginService.isLoggedIn) ) {
            event.preventDefault();
            $state.go('login');
        }else if( toState.name === 'login' ) {
            loginService.logout();
        }else {
            //TODO - check permissions for view...
        }
    });
}
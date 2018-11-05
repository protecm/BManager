import {IComponentOptions} from "angular";
import {LanguageService} from "../services/language.service";
import {LanguageInterface} from "../interfaces/language.interface";
import {LanguagesConstants} from "../constants/languages.constants";
import {LoginService} from "../services/login.service";
import {AuthenticationService} from "../services/authentication.service";

class HeaderComponent {
    public vm:HeaderComponent;

    public _selectedLanguage:LanguageInterface;

    constructor(private loginService:LoginService,
                private authenticationService:AuthenticationService,
                private languageService:LanguageService) {
        this._selectedLanguage = this.languageService.language;
    }

    public get isLoggedIn():boolean {
        return this.loginService.isLoggedIn;
    }

    public get username():string {
        return this.isLoggedIn ? this.authenticationService.username: '';
    }

    public get selectedLanguage():LanguageInterface {
        return this._selectedLanguage;
    }

    public set selectedLanguage(lang:LanguageInterface){
        this._selectedLanguage = lang;
        this.languageService.language = lang;
    }

    public get languages():LanguageInterface[] {
        return LanguagesConstants.LANGUAGES;
    }
}

export var headerComponent:IComponentOptions = {
    controller: HeaderComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/header.template.html'
};
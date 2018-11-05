import {LanguageDirection, LanguageInterface} from "../interfaces/language.interface";
import {IStateService} from "angular-ui-router";
import {ILocaleService} from "angular";

export class LanguageService {

    public static readonly DIRECTION_RTL_STR = 'rtl';
    public static readonly DIRECTION_LTR_STR = 'ltr';
    public static readonly DIRECTION_DEFAULT_STR = 'ltr';

    private _currentLanguage:LanguageInterface;
    private cssLinkElement:HTMLLinkElement;

    constructor(private $translate:angular.translate.ITranslateService,
                private $state:IStateService,
                private $locale:ILocaleService){
    }

    public get language():LanguageInterface {
        return this._currentLanguage;
    }

    public set language(lang:LanguageInterface) {
        if(lang && lang.code) {
            this._currentLanguage = lang;
            this.$translate.use(lang.code);
            this.refreshLocale();
            this.refreshApplicationStyle();
        }
    }

    private refreshLocale():void {
        this.$locale.DATETIME_FORMATS.SHORTDAY = this._currentLanguage.shortDays;
        this.$locale.DATETIME_FORMATS.MONTH = this._currentLanguage.months;
    }

    private refreshApplicationStyle():void {
        const href = this.createHrefUrl(this.currentDirection);
        if(this.cssLinkElement) {
            /* exists already - will happen on case that a language is changed by the user */
            this.cssLinkElement.href = href;
        }else {
            this.cssLinkElement = this.createCssLink(href);
            document.head.appendChild(this.cssLinkElement);
        }
    }

    private createHrefUrl(direction:string):string {
        return [
            'app/assets/css/app-',
            direction,
            '.min.css'
        ].join('');
    }

    private createCssLink(href:string):HTMLLinkElement {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        return link;
    }

    private get currentDirection():string {
        if(this._currentLanguage && this._currentLanguage.direction) {
            return this._currentLanguage.direction === LanguageDirection.RTL ?
                LanguageService.DIRECTION_RTL_STR:LanguageService.DIRECTION_LTR_STR;
        }
        return LanguageService.DIRECTION_DEFAULT_STR;
    }
}
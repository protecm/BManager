"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var language_interface_1 = require("../interfaces/language.interface");
var LanguageService = /** @class */ (function () {
    function LanguageService($translate, $state, $locale) {
        this.$translate = $translate;
        this.$state = $state;
        this.$locale = $locale;
    }
    Object.defineProperty(LanguageService.prototype, "language", {
        get: function () {
            return this._currentLanguage;
        },
        set: function (lang) {
            if (lang && lang.code) {
                this._currentLanguage = lang;
                this.$translate.use(lang.code);
                this.refreshLocale();
                this.refreshApplicationStyle();
            }
        },
        enumerable: true,
        configurable: true
    });
    LanguageService.prototype.refreshLocale = function () {
        this.$locale.DATETIME_FORMATS.SHORTDAY = this._currentLanguage.shortDays;
        this.$locale.DATETIME_FORMATS.MONTH = this._currentLanguage.months;
    };
    LanguageService.prototype.refreshApplicationStyle = function () {
        var href = this.createHrefUrl(this.currentDirection);
        if (this.cssLinkElement) {
            /* exists already - will happen on case that a language is changed by the user */
            this.cssLinkElement.href = href;
        }
        else {
            this.cssLinkElement = this.createCssLink(href);
            document.head.appendChild(this.cssLinkElement);
        }
    };
    LanguageService.prototype.createHrefUrl = function (direction) {
        return [
            'app/assets/css/app-',
            direction,
            '.min.css'
        ].join('');
    };
    LanguageService.prototype.createCssLink = function (href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        return link;
    };
    Object.defineProperty(LanguageService.prototype, "currentDirection", {
        get: function () {
            if (this._currentLanguage && this._currentLanguage.direction) {
                return this._currentLanguage.direction === language_interface_1.LanguageDirection.RTL ?
                    LanguageService.DIRECTION_RTL_STR : LanguageService.DIRECTION_LTR_STR;
            }
            return LanguageService.DIRECTION_DEFAULT_STR;
        },
        enumerable: true,
        configurable: true
    });
    LanguageService.DIRECTION_RTL_STR = 'rtl';
    LanguageService.DIRECTION_LTR_STR = 'ltr';
    LanguageService.DIRECTION_DEFAULT_STR = 'ltr';
    return LanguageService;
}());
exports.LanguageService = LanguageService;
//# sourceMappingURL=language.service.js.map
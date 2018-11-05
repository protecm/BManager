"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var languages_constants_1 = require("../constants/languages.constants");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(loginService, authenticationService, languageService) {
        this.loginService = loginService;
        this.authenticationService = authenticationService;
        this.languageService = languageService;
        this._selectedLanguage = this.languageService.language;
    }
    Object.defineProperty(HeaderComponent.prototype, "isLoggedIn", {
        get: function () {
            return this.loginService.isLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "username", {
        get: function () {
            return this.isLoggedIn ? this.authenticationService.username : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "selectedLanguage", {
        get: function () {
            return this._selectedLanguage;
        },
        set: function (lang) {
            this._selectedLanguage = lang;
            this.languageService.language = lang;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "languages", {
        get: function () {
            return languages_constants_1.LanguagesConstants.LANGUAGES;
        },
        enumerable: true,
        configurable: true
    });
    return HeaderComponent;
}());
exports.headerComponent = {
    controller: HeaderComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/header.template.html'
};
//# sourceMappingURL=header.component.js.map
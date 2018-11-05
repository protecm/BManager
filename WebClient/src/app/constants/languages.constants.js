"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var language_interface_1 = require("../interfaces/language.interface");
var LanguagesConstants = /** @class */ (function () {
    function LanguagesConstants() {
    }
    LanguagesConstants.DEFAULT_LANGUAGE = {
        name: 'Hebrew',
        code: 'heb',
        direction: language_interface_1.LanguageDirection.RTL,
        shortDays: [
            'ראש',
            'שני',
            'שלי',
            'רבי',
            'חמי',
            'שיש',
            'שבת'
        ],
        months: [
            'ינואר',
            'פברואר',
            'מרץ',
            'אפריל',
            'מאי',
            'יוני',
            'יולי',
            'אוגוסט',
            'ספטמבר',
            'אוקטובר',
            'נובמבר',
            'דצמבר'
        ]
    };
    LanguagesConstants.LANGUAGES = [
        LanguagesConstants.DEFAULT_LANGUAGE,
        {
            name: 'English',
            code: 'en',
            direction: language_interface_1.LanguageDirection.LTR,
            shortDays: [
                'Su',
                'Mo',
                'Tu',
                'We',
                'Th',
                'Fr',
                'Sa'
            ],
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
        }
    ];
    return LanguagesConstants;
}());
exports.LanguagesConstants = LanguagesConstants;
//# sourceMappingURL=languages.constants.js.map
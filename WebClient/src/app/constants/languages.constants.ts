import {LanguageDirection, LanguageInterface} from "../interfaces/language.interface";

export class LanguagesConstants {

    public static readonly DEFAULT_LANGUAGE:LanguageInterface = {
        name: 'Hebrew',
        code: 'heb',
        direction: LanguageDirection.RTL,
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

    public static readonly LANGUAGES:LanguageInterface[] = [
        LanguagesConstants.DEFAULT_LANGUAGE,
        {
            name: 'English',
            code: 'en',
            direction: LanguageDirection.LTR,
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

}
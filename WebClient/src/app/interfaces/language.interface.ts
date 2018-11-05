export enum LanguageDirection {
    LTR,
    RTL
}

export interface LanguageInterface {
    name:string;
    code:string;
    direction:LanguageDirection;
    shortDays:string[];
    months:string[];
}


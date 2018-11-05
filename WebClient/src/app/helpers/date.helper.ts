import {IDatepickerConfig} from "angular-ui-bootstrap";

export class DateHelper {

    constructor(){

    }

    public static GetFirstDateOfMonth(daysInterval:number = 1):Date {
        const currDate = new Date();
        return new Date(currDate.getFullYear(), currDate.getMonth(), daysInterval);
    }

    public static GetLastDateOfMonth(daysInterval:number = 0):Date {
        const currDate = new Date();
        return new Date(currDate.getFullYear(), currDate.getMonth()+1, daysInterval);
    }

    public static GetTodayDate(hoursInterval:number = 0):Date {
        let currDate = new Date();
        currDate.setHours(currDate.getHours() + hoursInterval);
        return currDate;
    }

    public static GetTomorrowDate(date:Date):Date {
        const toDateTomorrow = new Date(date.toString());
        toDateTomorrow.setDate(date.getDate()+1);
        return toDateTomorrow;
    }

    public static GetDefaultDateOptions():IDatepickerConfig {
        return {
            formatDay: 'dd',
            formatMonth: 'MM',
            formatYear: 'yyyy',
            startingDay: 0
        };
    }
}
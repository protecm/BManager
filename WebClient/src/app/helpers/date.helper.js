"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateHelper = /** @class */ (function () {
    function DateHelper() {
    }
    DateHelper.GetFirstDateOfMonth = function (daysInterval) {
        if (daysInterval === void 0) { daysInterval = 1; }
        var currDate = new Date();
        return new Date(currDate.getFullYear(), currDate.getMonth(), daysInterval);
    };
    DateHelper.GetLastDateOfMonth = function (daysInterval) {
        if (daysInterval === void 0) { daysInterval = 0; }
        var currDate = new Date();
        return new Date(currDate.getFullYear(), currDate.getMonth() + 1, daysInterval);
    };
    DateHelper.GetTodayDate = function (hoursInterval) {
        if (hoursInterval === void 0) { hoursInterval = 0; }
        var currDate = new Date();
        currDate.setHours(currDate.getHours() + hoursInterval);
        return currDate;
    };
    DateHelper.GetTomorrowDate = function (date) {
        var toDateTomorrow = new Date(date.toString());
        toDateTomorrow.setDate(date.getDate() + 1);
        return toDateTomorrow;
    };
    DateHelper.GetDefaultDateOptions = function () {
        return {
            formatDay: 'dd',
            formatMonth: 'MM',
            formatYear: 'yyyy',
            startingDay: 0
        };
    };
    return DateHelper;
}());
exports.DateHelper = DateHelper;
//# sourceMappingURL=date.helper.js.map
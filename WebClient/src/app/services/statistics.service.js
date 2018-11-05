"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var statistics_object_1 = require("../objects/statistics.object");
var communication_constants_1 = require("../constants/communication.constants");
var date_helper_1 = require("../helpers/date.helper");
var order_filter_object_1 = require("../objects/order/order.filter.object");
var StatisticsService = /** @class */ (function () {
    function StatisticsService(communicationService, confService) {
        this.communicationService = communicationService;
        this.confService = confService;
        this.cacheData = {};
    }
    StatisticsService.prototype.getStatistics = function () {
        var _this = this;
        var hoursInterval = this.confService.configurationData.monitorActiveOrderHours;
        var toDate = date_helper_1.DateHelper.GetTodayDate(hoursInterval);
        return this.communicationService.sendRequest(communication_constants_1.CommunicationConstants.GET_STATISTICS, order_filter_object_1.OrderFilterObject.GetStatisticsFilter(toDate))
            .then(function (srvMsg) {
            _this.timestamp = Date.now();
            _this.cacheData.statistics = _this.deserialize(srvMsg.dbMsg);
            return _this.cacheData.statistics;
        });
    };
    Object.defineProperty(StatisticsService.prototype, "cachedStatistics", {
        get: function () {
            return this.cacheData.statistics;
        },
        enumerable: true,
        configurable: true
    });
    /* NetworkServiceInterface */
    StatisticsService.prototype.convert = function (statisticsDto) {
        if (statisticsDto) {
            var statisticsObj = new statistics_object_1.StatisticsObject(statisticsDto.general, statisticsDto.onDelay);
            return statisticsObj.deserialize();
        }
        return null;
    };
    StatisticsService.prototype.deserialize = function (dbMsg) {
        return this.convert(dbMsg.data);
    };
    StatisticsService.prototype.deserializeArray = function (dbMsg) {
        return [];
    };
    return StatisticsService;
}());
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=statistics.service.js.map
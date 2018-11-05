"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("../components/home.component");
var statistics_service_1 = require("../services/statistics.service");
exports.homeModule = angular
    .module('homeModule', ['chart.js'])
    .component('homeView', home_component_1.homeComponent)
    .service('statisticsService', statistics_service_1.StatisticsService);
//# sourceMappingURL=home.module.js.map
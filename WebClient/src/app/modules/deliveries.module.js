"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deliveries_component_1 = require("../components/deliveries.component");
var deliveries_service_1 = require("../services/deliveries.service");
exports.deliveriesModule = angular
    .module('deliveriesModule', [])
    .component('deliveriesView', deliveries_component_1.deliveriesComponent)
    .service('deliveriesService', deliveries_service_1.DeliveriesService);
//# sourceMappingURL=deliveries.module.js.map
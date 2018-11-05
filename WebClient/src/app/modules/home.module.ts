import {IAngularStatic} from "angular";
import {homeComponent} from "../components/home.component";
import {StatisticsService} from "../services/statistics.service";

declare const angular:IAngularStatic;
export const homeModule = angular
    .module('homeModule',['chart.js'])
    .component('homeView',homeComponent)
    .service('statisticsService',StatisticsService);
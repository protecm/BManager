import {IAngularStatic} from "angular";
import {deliveriesComponent} from "../components/deliveries.component";
import {DeliveriesService} from "../services/deliveries.service";

declare const angular:IAngularStatic;
export const deliveriesModule = angular
    .module('deliveriesModule',[])
    .component('deliveriesView',deliveriesComponent)
    .service('deliveriesService',DeliveriesService);
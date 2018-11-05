import {IAngularStatic} from "angular";
import {customersComponent} from "../components/customers.component";
import {CustomerService} from "../services/customer.service";
import {customersTableComponent} from "../components/tables/customers.table.component";

declare const angular:IAngularStatic;
export const customersModule = angular
    .module('customersModule',[])
    .component('customersTable',customersTableComponent)
    .component('customersView',customersComponent)
    .service('customerService',CustomerService);
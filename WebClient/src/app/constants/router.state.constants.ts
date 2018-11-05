import {IState} from "angular-ui-router";

export interface RestrictedStateInterface extends IState {
    permission:string;
}

export class RouterStateConstants {
    public static readonly STATE_HOME:RestrictedStateInterface = {
        name: 'home',
        url: '/home',
        parent: 'main',
        template: '<home-view></home-view>',
        permission: 'accessHome'
    };
    public static readonly STATE_PRODUCTS:RestrictedStateInterface = {
        name: 'products',
        url: '/products',
        parent: 'main',
        template: '<products-view></products-view>',
        permission: 'accessProducts'
    };
    public static readonly STATE_CUSTOMERS:RestrictedStateInterface = {
        name: 'customers',
        url: '/customers',
        parent: 'main',
        template: '<customers-view></customers-view>',
        permission: 'accessCustomers'
    };
    public static readonly STATE_ORDERS:RestrictedStateInterface = {
        name: 'orders',
        url: '/orders',
        parent: 'main',
        template: '<orders-view></orders-view>',
        permission: 'accessOrders'
    };
    public static readonly STATE_MONITOR:RestrictedStateInterface = {
        name: 'monitor',
        url: '/monitor',
        parent: 'main',
        template: '<monitor-view></monitor-view>',
        permission: 'accessMonitor'
    };
    public static readonly STATE_DELIVERIES:RestrictedStateInterface = {
        name: 'deliveries',
        url: '/deliveries',
        parent: 'main',
        template: '<deliveries-view></deliveries-view>',
        permission: 'accessDeliveries'
    };
    public static readonly STATE_REPORTS:RestrictedStateInterface = {
        name: 'reports',
        url: '/reports',
        parent: 'main',
        template: '<reports-view></reports-view>',
        permission: 'accessReports'
    };
    public static readonly STATE_SYSTEM:RestrictedStateInterface = {
        name: 'system',
        url: '/system',
        parent: 'main',
        template: '<system-view></system-view>',
        permission: 'accessSystem'
    };

    //The array order is identical to the navigation bar order
    public static readonly STATES:RestrictedStateInterface[] = [
        RouterStateConstants.STATE_HOME,
        RouterStateConstants.STATE_PRODUCTS,
        RouterStateConstants.STATE_CUSTOMERS,
        RouterStateConstants.STATE_ORDERS,
        RouterStateConstants.STATE_MONITOR,
        RouterStateConstants.STATE_DELIVERIES,
        RouterStateConstants.STATE_REPORTS,
        RouterStateConstants.STATE_SYSTEM
    ];
}

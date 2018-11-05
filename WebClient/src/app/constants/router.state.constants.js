"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouterStateConstants = /** @class */ (function () {
    function RouterStateConstants() {
    }
    RouterStateConstants.STATE_HOME = {
        name: 'home',
        url: '/home',
        parent: 'main',
        template: '<home-view></home-view>',
        permission: 'accessHome'
    };
    RouterStateConstants.STATE_PRODUCTS = {
        name: 'products',
        url: '/products',
        parent: 'main',
        template: '<products-view></products-view>',
        permission: 'accessProducts'
    };
    RouterStateConstants.STATE_CUSTOMERS = {
        name: 'customers',
        url: '/customers',
        parent: 'main',
        template: '<customers-view></customers-view>',
        permission: 'accessCustomers'
    };
    RouterStateConstants.STATE_ORDERS = {
        name: 'orders',
        url: '/orders',
        parent: 'main',
        template: '<orders-view></orders-view>',
        permission: 'accessOrders'
    };
    RouterStateConstants.STATE_MONITOR = {
        name: 'monitor',
        url: '/monitor',
        parent: 'main',
        template: '<monitor-view></monitor-view>',
        permission: 'accessMonitor'
    };
    RouterStateConstants.STATE_DELIVERIES = {
        name: 'deliveries',
        url: '/deliveries',
        parent: 'main',
        template: '<deliveries-view></deliveries-view>',
        permission: 'accessDeliveries'
    };
    RouterStateConstants.STATE_REPORTS = {
        name: 'reports',
        url: '/reports',
        parent: 'main',
        template: '<reports-view></reports-view>',
        permission: 'accessReports'
    };
    RouterStateConstants.STATE_SYSTEM = {
        name: 'system',
        url: '/system',
        parent: 'main',
        template: '<system-view></system-view>',
        permission: 'accessSystem'
    };
    //The array order is identical to the navigation bar order
    RouterStateConstants.STATES = [
        RouterStateConstants.STATE_HOME,
        RouterStateConstants.STATE_PRODUCTS,
        RouterStateConstants.STATE_CUSTOMERS,
        RouterStateConstants.STATE_ORDERS,
        RouterStateConstants.STATE_MONITOR,
        RouterStateConstants.STATE_DELIVERIES,
        RouterStateConstants.STATE_REPORTS,
        RouterStateConstants.STATE_SYSTEM
    ];
    return RouterStateConstants;
}());
exports.RouterStateConstants = RouterStateConstants;
//# sourceMappingURL=router.state.constants.js.map
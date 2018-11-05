import {IComponentOptions} from "angular";

class BmBadgeComponent {

    public type:string;                     //danger|success... : default is danger
    public msg:string|number;               //From Binding

    constructor() {
    }
}

export var bmBadgeComponent:IComponentOptions = {
    controller: BmBadgeComponent,
    controllerAs: 'vm',
    bindings: {
        type: '@',
        msg: '<'
    },
    template: `<span class="badge" ng-class="'badge-' + (vm.type || 'danger')" ng-bind="vm.msg" ng-if="vm.msg">
               </span>`
};
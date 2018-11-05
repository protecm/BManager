import {IComponentController, IComponentOptions, IScope} from "angular";
import {OrderObject} from "../../objects/order/order.object";
import {OrderStatus} from "../../constants/order.constants";
import {OrderRowObject} from "../../objects/order/order.row.object";

class MonitorStatusComponent implements IComponentController{

    public monitor:OrderObject|OrderRowObject;   //From Binding
    private monitorStatus:OrderStatus;

    constructor(private $scope:IScope){
    }

    public $onInit():void {
        this.$scope.$watch(() => {
            return this.monitor.status;
        } , (newValue, oldValue) => {
            this.monitorStatus = this.monitor.monitorStatus;
        });
    }
}

export var monitorStatusComponent:IComponentOptions = {
    controller: MonitorStatusComponent,
    controllerAs: 'vm',
    bindings: {
        monitor: '<'
    },
    template: `<div class="status-container" ng-class="vm.monitorStatus.styleClass">
                    <span>
                        {{ vm.monitorStatus.description | translate }}
                    </span>
                </div>`
};
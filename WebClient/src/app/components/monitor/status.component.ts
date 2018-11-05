import {IComponentController, IComponentOptions, IScope} from "angular";
import {OrderObject} from "../../objects/order/order.object";
import {OrderStatus} from "../../constants/order.constants";
import {OrderRowObject} from "../../objects/order/order.row.object";

class StatusComponent implements IComponentController{

    public monitor:OrderObject|OrderRowObject;   //From Binding
    private status:OrderStatus;

    constructor(private $scope:IScope){
    }

    public $onInit():void {
        this.$scope.$watch(() => {
            return this.monitor.status;
        } , (newValue:OrderStatus, oldValue:OrderStatus) => {
            this.status = newValue;
        });
    }
}

export var statusComponent:IComponentOptions = {
    controller: StatusComponent,
    controllerAs: 'vm',
    bindings: {
        monitor: '<'
    },
    template: `<div class="status-container" ng-class="vm.status.styleClass">
                    <span>
                        {{ vm.status.description | translate }}
                    </span>
                </div>`
};
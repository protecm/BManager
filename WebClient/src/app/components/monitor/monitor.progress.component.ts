import {IComponentController, IComponentOptions, IScope} from "angular";
import {OrderObject} from "../../objects/order/order.object";
import {MonitorOrderRowGroupObject} from "../../objects/monitor/monitor.order.row.group.object";
import {MonitorOrderRowObject} from "../../objects/monitor/monitor.order.row.object";

class MonitorProgressComponent implements IComponentController{

    public monitor:OrderObject;
    public monitorGroup:MonitorOrderRowObject[];
    public type:string;
    private static readonly TYPE_PRODUCTION = 'production';
    private static readonly TYPE_DELIVERIES = 'deliveries';
    public progressValue:number;
    public progressStyleClass:string;

    constructor(private $scope:IScope){
    }

    public $onInit():void {
        //  TODO - Code Review, need to watch values instead of function results! performance issue!
        // MonitorOrderRowObject & OrderObject implement progress interface...
        this.$scope.$watch(() => {
            if(this.monitor) {
                if(this.type && this.type === MonitorProgressComponent.TYPE_DELIVERIES) {
                    return this.monitor.deliveryProgress();
                }
                //default - production
                return this.monitor.productionProgress();
            }
            if(this.monitorGroup) return MonitorOrderRowGroupObject.CalculateProgress(this.monitorGroup);
            return 0;
        } , (newValue, oldValue) => {
            this.progressValue = newValue;
            if(this.monitor) {
                this.progressStyleClass = this.monitor.monitorStatus.styleClass;
            }else if(this.monitorGroup) {
                this.progressStyleClass = null;
            }
        });
    }
}

export var monitorProgressComponent:IComponentOptions = {
    controller: MonitorProgressComponent,
    controllerAs: 'vm',
    bindings: {
        monitor: '<',
        monitorGroup: '<',
        type: '<'
    },
    template: `<div>
                    <uib-progressbar style="margin: 0 3px 10px 3px;" class="progress-striped active" type="{{vm.progressStyleClass}}" value="vm.progressValue">
                        {{vm.progressValue}}%
                    </uib-progressbar>
                </div>`
};
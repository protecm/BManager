import {IComponentController, IComponentOptions} from "angular";
import {OrderNoteObject} from "../../objects/order/order.note.object";
import {ConfigurationService} from "../../services/configuration.service";

interface OnResolveFunc {
    ():Promise<boolean>;
}
class MonitorNoteComponent implements IComponentController {

    public note:OrderNoteObject;
    public onResolve:OnResolveFunc;

    public isResolveInProgress:boolean;
    constructor(private confService:ConfigurationService){
    }

    public $onInit():void {
    }

    public get isWaitingResolve():boolean {
        return this.confService.configurationData.commentsEnforcement && !this.note.isReallyResolved;
    }

    public resolve():void {
        if(this.onResolve) {
            this.isResolveInProgress = true;
            this.onResolve().then(
                (result:boolean) => {
                    this.isResolveInProgress = false;
                });
        }
    }
}

export var monitorNoteComponent:IComponentOptions = {
    controller: MonitorNoteComponent,
    controllerAs: 'vm',
    bindings: {
        note: '<',
        onResolve: '&?'
    },
    template: `<div ng-if="vm.note.note">
                    <span>
                        {{ vm.note.note }}
                    </span>
                    <button type="button" class="btn btn-success btn-xs" ng-click="vm.resolve();$event.stopPropagation();"
                        ng-if="vm.isWaitingResolve" ladda="vm.isResolveInProgress" 
                        data-style="expand-left" data-size="xs" data-spinner-size="25">
                            <span class="glyphicon glyphicon-ok" aria-hidden="true">
                            </span>
                    </button>
                </div>`
};
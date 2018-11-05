import {IComponentController, IComponentOptions} from "angular";

export interface ToggleBtnInterface<T> {
    data:T;
    msg:string;
    isSelected:boolean;
}

class BmToggleBtnComponent implements IComponentController{

    public target:ToggleBtnInterface<any>;

    constructor() {

    }

    public toggle():void {
        this.target.isSelected = !this.target.isSelected;
    }

    public $onInit():void {
    }
}

export var bmToggleBtnComponent:IComponentOptions = {
    controller: BmToggleBtnComponent,
    controllerAs: 'vm',
    bindings: {
        target: '<'
    },
    template: `<button type="button" style="margin: 3px;" class="btn" ng-class="'btn-'+(vm.target.isSelected?'info':'default')" 
                ng-click="vm.toggle()">
                    {{vm.target.msg}}
                </button>`
};
import {IComponentController, IComponentOptions, IScope} from "angular";
interface CallbackFunc {
    ():Promise<boolean>;
}

class NotFoundComponent implements IComponentController{

    public value:string;            //From Binding (search result)
    public msg:string;              //From Binding
    public callbackLabel:string;    //From Binding
    public callback:CallbackFunc;   //From Binding

    public isActionInProgress:boolean;
    constructor(private $scope:IScope){
    }

    public getWrappedValue():string {
        if(this.value) {
            return "\"" + this.value + "\"";
        }
        return "\"\"";
    }

    public callCallback():void {
        if(this.callback) {
            this.isActionInProgress =  true;
            this.callback().then(
                (result:boolean) => {
                    this.isActionInProgress  = false;
                });
        }
    }

    public $onInit():void {
        this.$scope.$watch(() => {
            return this.value;
        } , (newValue, oldValue) => {
            this.value = newValue;
        });
    }
}

export var notFoundComponent:IComponentOptions = {
    controller: NotFoundComponent,
    controllerAs: 'vm',
    bindings: {
        value: '<',
        msg: '@',
        callback: '&?',     //optional will enable to check if undefined, else angular will wrap the function
        callbackLabel: '@'
    },
    template: `<div class="row">
                    <div class="col-sm-8" style="text-align: center;font-weight: bold;color: red;">
                        <span>
                            {{vm.getWrappedValue()}} - {{vm.msg | translate}}
                        </span>
                    </div>
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-success btn-block" ng-click="vm.callCallback()"
                        ladda="vm.isActionInProgress" data-style="expand-left" data-spinner-size="25">
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            {{vm.callbackLabel | translate }}
                        </button>
                    </div>
                </div>`
};
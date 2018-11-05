import {IComponentController, IComponentOptions} from "angular";
import {ReportsManager} from "./reports.host.component";
import {ReportFormCtrlInterface} from "../../interfaces/report.form.ctrl.interface";
import {ReportFormDataInterface, ReportResultCtrlInterface} from "../../interfaces/report.result.ctrl.interface";

export interface ReportContainer {
    isVisible:boolean;
    readonly isBodyVisible:boolean;
    readonly reportFormCtrl:ReportFormCtrlInterface<any,any>;
    readonly reportResultCtrl:ReportResultCtrlInterface<any,any>;
    registerFormCtrl(ctrl:ReportFormCtrlInterface<any,any>):void;
    registerResultCtrl(ctrl:ReportResultCtrlInterface<any,any>):void;
    generate():void;
    print():void;
}

class ReportComponent implements IComponentController,ReportContainer {

    private parent:ReportsManager;          //From component require
    private _reportFormCtrl:ReportFormCtrlInterface<any,any>;
    private _reportResultCtrl:ReportResultCtrlInterface<any,any>;
    public _isVisible:boolean;

    constructor() {
    }

    public set isVisible(value:boolean) {
        this._isVisible = value;
        if( this._reportFormCtrl ) {
            this._reportFormCtrl.isVisible = value;
        }
    }

    public get isVisible():boolean {
        return this._isVisible;
    }

    public get isBodyVisible():boolean {
        return this.isVisible && this._reportResultCtrl && this._reportResultCtrl.isVisible;
    }

    public get reportFormCtrl():ReportFormCtrlInterface<any,any> {
        return this._reportFormCtrl;
    }

    public get reportResultCtrl():ReportResultCtrlInterface<any,any> {
        return this._reportResultCtrl;
    }

    public registerFormCtrl(ctrl:ReportFormCtrlInterface<any,any>):void {
        this._reportFormCtrl = ctrl;
        if( this.parent && this._reportFormCtrl ) {
            this.parent.registerReport(this._reportFormCtrl.type, this);
        }
    }

    public registerResultCtrl(ctrl:ReportResultCtrlInterface<any,any>):void {
        this._reportResultCtrl = ctrl;
    }

    public generate():void {
        if( this._reportFormCtrl ) {
            this._reportFormCtrl.generate()
                .then( (data:ReportFormDataInterface<any,any>) => {
                    if( this.reportResultCtrl && (this.reportFormCtrl.type.code === this.reportResultCtrl.type.code) ) {
                        this.reportResultCtrl.onDataChange(data);
                    }
                });
        }
    }

    public print():void {
        if( this._reportResultCtrl ) {
            this._reportResultCtrl.print();
        }
    }

    public $onInit():void {
    }

    public $postLink():void {
    }

    public $onDestroy():void {
    }
}

export var reportComponent:IComponentOptions = {
    controller: ReportComponent,
    controllerAs: 'vm',
    require: {
        parent: '^reportsHost'
    },
    transclude: {
        form: 'reportForm',
        body: '?reportBody'
    },
    template: `<div ng-show="vm.isVisible">
                   <div ng-transclude="form">
                   </div>
                   <div class="col-sm-12">
                        <div class="form-group row">
                            <button class="btn btn-primary btn-block" type="button" ng-click="vm.generate()" ladda="vm.isGenerateInProcess" 
                                    data-style="expand-left" data-spinner-size="25">
                                {{ 'GENERATE_REPORT' | translate}}
                            </button>
                        </div>
                   </div>
               </div>
               <div ng-show="vm.isBodyVisible">
                   <div ng-transclude="body">
                   </div>
                   <ng-transclude>
                   </ng-transclude>      
               </div>`
};
import {IAttributes, IDirective, INgModelController, IScope} from "angular";
import {IDirectiveOptions} from "../interfaces/directive.options.interface";

interface ConfirmValidateDirectiveScopeInterface extends IScope {
    testValue:string;
}

class ConfirmValidateDirective implements IDirective {
    public restrict:string = 'A';
    public scope:{[boundProperty: string]: string} = {
        testValue: '<' + confirmValidateDirective.name
    };

    public require:string = 'ngModel';
    private _scope:ConfirmValidateDirectiveScopeInterface;

    constructor() {
    }

    public link(scope: ConfirmValidateDirectiveScopeInterface, elem: JQLite, attrs: IAttributes, ngModelCtrl: INgModelController): void {
        this._scope = scope;

        //Validator is called on each key-down for the current element that the directive attached to,
        // we need the watch for running the validation when the user typing in the testValue field (other element)
        ngModelCtrl.$validators.confirm = this.validate.bind(this);
        this._scope.$watch(() => {
            return this._scope.testValue;
        } , (newValue, oldValue) => {
            ngModelCtrl.$validate();
        });
    }

    private validate(modelValue:string):boolean {
        return modelValue === this._scope.testValue;
    }
}

export var confirmValidateDirective:IDirectiveOptions = {
    name: 'confirmValidate',
    directive:  () => {
        return new ConfirmValidateDirective();
    },
    $inject: []
};
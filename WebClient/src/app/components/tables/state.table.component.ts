import {BaseTableComponent, BaseTableComponentOptions} from "./base.table.component";

export type TableState = 'Definition' | 'Monitoring';

export abstract class StateTableComponent<T> extends BaseTableComponent<T> {

    private defaultState:TableState = 'Definition';
    private _state:TableState;

    constructor() {
        super();
    }

    public get state():TableState {
        return this._state ? this._state:this.defaultState;
    }

    public set state(value:TableState) {
        this._state = value;
    }

    public get isStateDefinition():boolean {
        return this.state === 'Definition'
    }

    public get isStateMonitoring():boolean {
        return this.state === 'Monitoring';
    }
}

export abstract class StateTableComponentOptions<T> extends BaseTableComponentOptions<T> {
    constructor(controller: new(...args:any[]) => BaseTableComponent<T>, templateUrl:string) {
        super(controller,templateUrl);
        this.bindings.state = '<';
    }
}
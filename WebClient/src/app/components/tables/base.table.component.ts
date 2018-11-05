import {IComponentController, IComponentOptions} from "angular";

export interface BaseTableActionInterface<T> {
    (item:T):Promise<void>;
}

export interface BaseTableActionWrapperInterface<T> {
    ():BaseTableActionInterface<T>;
}

export abstract class BaseTableComponent<T> implements IComponentController {

    public data:T[];                        //From binding
    public showFilters:boolean;             //From binding
    public showSorting:boolean;
    public showActions:boolean;
    public onRowClick:BaseTableActionWrapperInterface<T|number>;
    public onDeleteAction:BaseTableActionWrapperInterface<T|number>;
    public tbodyStyle:Object;
    public filterItem:T;
    public sortProperty:string;             //From binding - Set the property name with prefix of direction, + ASC, - DESC
    public isDeleteInProcess = {};

    constructor() {
    }

    public abstract onRowClickImpl(item:T|number):void;
    public abstract deleteRow(item:T|number):void;
}

export abstract class BaseTableComponentOptions<T> implements IComponentOptions {

    public controller;
    public templateUrl;
    public controllerAs:string = 'vm';
    public bindings:{[boundProperty: string]: string} =  {
        data: '<',
        showFilters: '<',
        showSorting: '<',
        sortProperty: '@',
        showActions: '<',
        onRowClick: '&?',   //optional will enable to check if undefined, else angular will wrap the function
        onDeleteAction: '&?',
        tbodyStyle: '<'
    };

    constructor(controller: new(...args:any[]) => BaseTableComponent<T>, templateUrl:string) {
        this.controller = controller;
        this.templateUrl = templateUrl;
    }

}
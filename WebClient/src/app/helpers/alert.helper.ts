export interface AlertInterface {
    type:string;            //bootstrap-field
    msg:string;             //bootstrap-field
    isResolvable:boolean;  //custom-field
}

export class AlertHelper {
    public static readonly TYPE_WARNING = 'warning';
    public static readonly TYPE_DANGER = 'danger';
    public static readonly TYPE_SUCCESS = 'success';

    public alerts:AlertInterface[];

    constructor(){
        this.alerts = [];
    }

    public addAlert(type:string, msg:string, isResolvable:boolean = true):void {
        this.alerts.push({
            type: type,
            msg: msg,
            isResolvable: isResolvable
        });
    }

    public clear():void {
        this.alerts = [];
    }

    public closeAlert(pos:number) {
        this.alerts.splice(pos,1);
    }
}
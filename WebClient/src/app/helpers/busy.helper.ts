export interface CgBusyInterface {
    promise:Promise<any>;
    message:string;
    backdrop:boolean;
    templateUrl:string;
    delay:number;
    minDuration:number;
}
export class BusyHelper {
    public static GetDefaultBusy(message:string):CgBusyInterface {
        return {
            promise:undefined,
            message:message,
            backdrop:true,
            templateUrl:'app/templates/busy.template.html',
            delay:0,
            minDuration:500
        };
    }
}
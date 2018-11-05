import {ReportType} from "../constants/report.constants";


export interface ReportFormDataInterface<T,K> {
    data:T[];
    settings:K;
}

export interface ReportResultCtrlInterface<T,K> {
    readonly type:ReportType;
    readonly isVisible:boolean;
    onDataChange(formData:ReportFormDataInterface<T,K>):void;
    print():void;
}
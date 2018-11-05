import {ReportType} from "../constants/report.constants";
import {ReportFormDataInterface} from "./report.result.ctrl.interface";

export interface ReportFormCtrlInterface<T,K> {
    isVisible:boolean;
    isGenerateInProcess:boolean;
    readonly type:ReportType;
    generate():Promise<ReportFormDataInterface<T,K>>;
}
import {IComponentOptions} from "angular";
import {ReportConstants, ReportType} from "../../constants/report.constants";
import {ReportContainer} from "./report.component";

export interface ReportsManager {
    registerReport(report:ReportType, container:ReportContainer):void;
    print():void;
}

class ReportsHostComponent implements ReportsManager {
    public isEditDisabled:boolean;
    public selectedReportType:ReportType;
    public reportTypes:ReportType[];
    private reportsRepo:{[key:number]:ReportContainer};

    private currSelectedReportType:ReportType;

    constructor() {
        this.reportTypes = ReportConstants.TYPE_LIST;
        this.reportsRepo = {};
    }

    public registerReport(report:ReportType, container:ReportContainer):void {
        if( report && container ) {
            this.reportsRepo[report.code] = container;
        }
    }

    public print():void {
        if( this.currSelectedReportType && this.reportsRepo[this.currSelectedReportType.code] ) {
            this.reportsRepo[this.currSelectedReportType.code].print();
        }
    }

    public onReportTypeSelected(type:ReportType):void {
        if( this.currSelectedReportType && this.reportsRepo[this.currSelectedReportType.code] ) {
            this.reportsRepo[this.currSelectedReportType.code].isVisible = false;
        }
        this.currSelectedReportType = type;
        if( this.currSelectedReportType && this.reportsRepo[this.currSelectedReportType.code] ) {
            this.reportsRepo[this.currSelectedReportType.code].isVisible = true;
        }
    }
}

export var reportsHostComponent:IComponentOptions = {
    controller: ReportsHostComponent,
    controllerAs: 'vm',
    transclude: true,
    templateUrl: 'app/templates/reports/reports.host.template.html'
};
import {IToastrService} from "angular-toastr";

export class ToastService {
    constructor(private toastr:IToastrService,
                private $translate:angular.translate.ITranslateService) {

    }

    public showSuccess(msg:string, title:string):void {
        msg = this.$translate.instant(msg);
        title = this.$translate.instant(title);
        this.toastr.success(msg, title);
    }

    public showError(msg:string, title:string):void {
        msg = this.$translate.instant(msg);
        title = this.$translate.instant(title);
        this.toastr.error(msg, title);
    }
}
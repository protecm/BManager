import {IModalInstanceService,IModalSettings} from "angular-ui-bootstrap";

class ConfirmModalComponent {
    constructor(private $uibModalInstance:IModalInstanceService,
                public title:string,
                public msg:string) {
    }

    public ok():void {
        this.$uibModalInstance.close(true);
    }

    public cancel():void {
        this.$uibModalInstance.dismiss();
    }
}

export class confirmModalComponent implements IModalSettings {
    public animation:boolean = true;
    public controller:Function = ConfirmModalComponent;
    public bindToController:boolean = true;
    public controllerAs:string = 'vm';
    public templateUrl:string = 'app/templates/modals/confirm.modal.template.html';
    public resolve:any;

    constructor(title:string,msg:string) {
        this.resolve = {
            title: () => {return title;},
            msg: () => {return msg;}
        };
    }
}
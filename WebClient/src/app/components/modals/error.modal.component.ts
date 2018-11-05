import {IModalSettings, IModalInstanceService} from "angular-ui-bootstrap";

class ErrorModalComponent {

    public vm:ErrorModalComponent;
    constructor(private $uibModalInstance:IModalInstanceService,
                public title:string,
                public msg:string) {
    }

    public confirm():void {
        this.$uibModalInstance.close();
    }
}

export class errorModalComponent implements IModalSettings {
    public animation:boolean = true;
    public controller:Function = ErrorModalComponent;
    public bindToController:boolean = true;
    public controllerAs:string = 'vm';
    public templateUrl:string = 'app/templates/modals/error.modal.template.html';
    public resolve:any;

    constructor(title:string,msg:string) {
        this.resolve = {
            title: () => {return title;},
            msg: () => {return msg;}
        };
    }
}
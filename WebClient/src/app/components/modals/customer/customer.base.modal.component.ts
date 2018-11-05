import {AlertHelper} from "../../../helpers/alert.helper";
import {IModalInstanceService, IModalSettings} from "angular-ui-bootstrap";
import {CustomerObject} from "../../../objects/customer/customer.object";

export abstract class CustomerBaseModalComponent {
    public title:string;
    public id:number;
    public name:string;
    public phone:string;
    public isDeleted:boolean;
    public isSaveInProcess:boolean;
    public alertHelper:AlertHelper;

    constructor(protected $uibModalInstance: IModalInstanceService,
                public customer:CustomerObject){

        if(this.customer) {
            this.id = this.customer.id;
            this.name = this.customer.name;
            this.phone = this.customer.phone;
            this.isDeleted = this.customer.isDeleted;
        }else {
            this.isDeleted = false;
        }
        this.alertHelper = new AlertHelper();
    }

    public abstract save(valid: boolean): void;

    public cancel():void {
        this.$uibModalInstance.dismiss();
    }
}

export class CustomerBaseModalSettings implements IModalSettings {

    public animation:boolean = true;
    public backdrop:boolean|string = 'static';
    public controller:Function = CustomerBaseModalComponent;
    public bindToController:boolean = true;
    public controllerAs:string = 'vm';
    public templateUrl:string = 'app/templates/modals/customer.modal.template.html';
    public resolve:any;

    constructor(customer:CustomerObject){
        this.resolve = {
            customer: () => {return customer;}
        };
    }
}
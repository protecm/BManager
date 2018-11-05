import {AlertHelper} from "../../../helpers/alert.helper";
import {IModalInstanceService, IModalSettings} from "angular-ui-bootstrap";
import {CategoryObject} from "../../../objects/category.object";

export abstract class CategoryBaseModalComponent {
    public title:string;
    public id: number;
    public name: string;
    public isDeleted:boolean;
    public isSaveInProcess:boolean;
    public alertHelper:AlertHelper;

    constructor(protected $uibModalInstance: IModalInstanceService,
                public category:CategoryObject) {

        if(this.category) {
            this.id = this.category.id;
            this.name = this.category.name;
            this.isDeleted = this.category.isDeleted;
        }else {
            this.isDeleted = false;
        }
        this.alertHelper = new AlertHelper();
    }

    public abstract save(valid:boolean):void;

    public cancel():void {
        this.$uibModalInstance.dismiss();
    }
}

export class CategoryBaseModalSettings implements IModalSettings {

    public animation:boolean = true;
    public backdrop:boolean|string = 'static';
    public controller:Function = CategoryBaseModalComponent;
    public bindToController:boolean = true;
    public controllerAs:string = 'vm';
    public templateUrl:string = 'app/templates/modals/category.modal.template.html';
    public resolve:any;

    constructor(category:CategoryObject){
        this.resolve = {
            category: () => {return category;}
        };
    }
}
import {IModalInstanceService, IModalSettings} from "angular-ui-bootstrap";
import {UserObject} from "../../../objects/user/user.object";
import {AlertHelper} from "../../../helpers/alert.helper";
import {UserAccessObject, UserAccessObjectInterface} from "../../../objects/user/user.access.object";

export abstract class UserBaseModalComponent {
    public title:string;

    public id: number;
    public role:string;
    public username: string;
    public password: string;
    public passwordConfirm:string;
    public userAccess:UserAccessObjectInterface;

    public isDeleted:boolean;
    public isSaveInProcess:boolean;
    public alertHelper:AlertHelper;

    public isEditMode:boolean;
    public isEditPassword:boolean;

    constructor(protected $uibModalInstance: IModalInstanceService,
                public user:UserObject) {
        if(this.user) {
            this.id = this.user.id;
            this.username = this.user.username;
            this.password = this.user.password;
            this.passwordConfirm = this.user.password;
            this.userAccess = this.user.userAccess.getObject();
            this.isDeleted = this.user.isDeleted;
        }else {
            this.password = '';
            this.passwordConfirm = '';
            this.userAccess = UserAccessObject.CreateInstance().getObject();
            this.isDeleted = false;
        }
        this.alertHelper = new AlertHelper();
    }

    public abstract save(valid:boolean):void;

    public cancel():void {
        this.$uibModalInstance.dismiss();
    }
}

export class UserBaseModalSettings implements IModalSettings {
    public animation:boolean = true;
    public backdrop:boolean|string = 'static';
    public controller:Function = UserBaseModalComponent;
    public bindToController:boolean = true;
    public controllerAs:string = 'vm';
    public templateUrl:string = 'app/templates/modals/user.modal.template.html';
    public resolve:any;

    constructor(user:UserObject){
        this.resolve = {
            user: () => {return user;}
        };
    }
}
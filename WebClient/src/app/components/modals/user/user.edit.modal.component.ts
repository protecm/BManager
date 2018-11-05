import {UserBaseModalComponent, UserBaseModalSettings} from "./user.base.modal.component";
import {IModalInstanceService} from "angular-ui-bootstrap";
import {UserObject} from "../../../objects/user/user.object";
import {UsersService} from "../../../services/users.service";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";
import {UserAccessObject} from "../../../objects/user/user.access.object";

class UserEditModalComponent extends UserBaseModalComponent {

    constructor($uibModalInstance: IModalInstanceService,
                private usersService:UsersService,
                private $translate:angular.translate.ITranslateService,
                user:UserObject) {
        super($uibModalInstance,user);
        this.isEditMode = true;
        this.isEditPassword = false;
        this.title = this.$translate.instant('EDIT_USER');
    }

    public save(valid: boolean): void {
        this.alertHelper.clear();

        if(valid) {
            this.isSaveInProcess = true;

            let editedUserAccess = new UserAccessObject(this.userAccess.accessHome, this.userAccess.accessProducts, this.userAccess.accessCustomers,
                this.userAccess.accessOrders, this.userAccess.accessMonitor, this.userAccess.accessDeliveries, this.userAccess.accessReports,
                this.userAccess.accessSystem);
            const password:string = this.isEditPassword ? this.password:'';
            let editedUser = new UserObject(this.id,this.username,password,editedUserAccess,this.isDeleted);

            this.usersService.editUser(this.user, editedUser).then((dbMsg: DataBaseMessageInterface<any>) => {
                this.isSaveInProcess = false;
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    editedUser = new UserObject(editedUser.id, editedUser.username, '', editedUser.userAccess, editedUser.isDeleted);
                    this.$uibModalInstance.close(editedUser);
                }else {
                    //handle error
                }
            });
        }
    }
}

export class userEditModalComponent extends UserBaseModalSettings {
    public controller:Function = UserEditModalComponent;

    constructor(user:UserObject){
        super(user);
    }
}
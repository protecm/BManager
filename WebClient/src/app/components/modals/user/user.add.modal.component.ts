import {UserBaseModalComponent, UserBaseModalSettings} from "./user.base.modal.component";
import {IModalInstanceService} from "angular-ui-bootstrap";
import {UsersService} from "../../../services/users.service";
import {UserObject} from "../../../objects/user/user.object";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {UserAccessObject} from "../../../objects/user/user.access.object";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";

class UserAddModalComponent extends UserBaseModalComponent {

    constructor($uibModalInstance: IModalInstanceService,
                private usersService:UsersService,
                private $translate:angular.translate.ITranslateService,
                user:UserObject) {
        super($uibModalInstance,user);
        this.isEditMode = false;
        this.isEditPassword = true;
        this.title = this.$translate.instant('ADD_USER');
        this.id = this.$translate.instant('NEW') as any;
    }

    public save(valid: boolean): void {
        this.alertHelper.clear();

        if(valid) {
            this.isSaveInProcess = true;

            let newUserAccess = new UserAccessObject(this.userAccess.accessHome, this.userAccess.accessProducts, this.userAccess.accessCustomers,
                this.userAccess.accessOrders, this.userAccess.accessMonitor, this.userAccess.accessDeliveries, this.userAccess.accessReports,
                this.userAccess.accessSystem);
            let newUser = new UserObject(null,this.username,this.password,newUserAccess,this.isDeleted);

            this.usersService.addUser(newUser).then((dbMsg: DataBaseMessageInterface<any>) => {
                this.isSaveInProcess = false;
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    newUser = new UserObject(dbMsg.data, newUser.username, '', newUser.userAccess, newUser.isDeleted);
                    this.$uibModalInstance.close(newUser);
                }else {
                    //handle error
                }
            });
        }
    }
}

export class userAddModalComponent extends UserBaseModalSettings {
    public controller:Function = UserAddModalComponent;

    constructor(user:UserObject = null){
        super(user);
    }
}


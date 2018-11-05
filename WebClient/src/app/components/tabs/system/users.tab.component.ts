import {IComponentOptions} from "angular";
import {UserObject} from "../../../objects/user/user.object";
import {UsersService} from "../../../services/users.service";
import {ModalService} from "../../../services/modal.service";
import {userEditModalComponent} from "../../modals/user/user.edit.modal.component";
import {ConfirmationService} from "../../../services/confirmation.service";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";
import {ToastService} from "../../../services/toast.service";
import {UserFilterObject} from "../../../objects/user/user.filter.object";
import {userAddModalComponent} from "../../modals/user/user.add.modal.component";

class UsersTabComponent {

    public users:UserObject[];
    public isDeleteInProcess = {};

    constructor(private usersService:UsersService,
                private confirmationService:ConfirmationService,
                private $translate:angular.translate.ITranslateService,
                private modalService:ModalService,
                private toastService:ToastService) {

        const activeUsersFilter = UserFilterObject.GetActiveUsersFilter();
        this.getUsersFromServer(activeUsersFilter);

    }

    public createUser():void {
        let options = new userAddModalComponent();
        this.modalService.showModal<UserObject>(options)
            .then( (data:UserObject) => {
                if(data) {
                    //user added
                    this.addUser(data);
                    this.toastService.showSuccess('CREATED_SUCCESSFULLY','USER');
                }
            },(error) => {
                //handle error/dismiss
            });
    }

    public editUser(user:UserObject):void {
        let options = new userEditModalComponent(user);
        this.modalService.showModal<UserObject>(options)
            .then( (data:UserObject) => {
                if(data) {
                    //user edited
                    this.updateUser(user, data);
                }
            },(error) => {
                //handle error/dismiss
            });
    }

    private addUser(user:UserObject):void {
        this.users.push(user);
    }

    private updateUser(orgUser:UserObject, edtUser:UserObject):void {
        const len = this.users.length;
        for(let i=0; i<len; i++) {
            if( this.users[i].id === orgUser.id) {
                this.users[i] = edtUser;
                break;
            }
        }
    }

    public deleteUserRequest(user:UserObject):void {
        const title = this.$translate.instant('DELETE_USER');
        const bodyMsg = this.confirmationService.getDefaultBodyTemplate(
            this.$translate.instant('CONFIRM_DELETE_USER'),
            user.username
        );
        this.confirmationService.confirm(title,bodyMsg)
            .then( (result:boolean) => {
                if(result) {
                    this.deleteUser(user);
                }
            },(error) => {
                    //handle error/dismiss
            });
    }

    private deleteUser(user:UserObject):void {
        this.isDeleteInProcess[user.id] = true;
        this.usersService.deleteUser(user)
            .then( (dbMsg: DataBaseMessageInterface<any>) => {
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    //user deleted
                    user.isDeleted = true;
                    this.removeUser(user);
                    this.toastService.showSuccess('DELETED_SUCCESSFULLY','USER');
                }else {
                    //handle error
                }
                this.isDeleteInProcess[user.id] = false;
            });
    }

    private removeUser(user:UserObject): void {
        const len = this.users.length;
        for(let i=0; i<len; i++) {
            if( this.users[i].id === user.id ) {
                this.users.splice(i,1);
                break;
            }
        }
    }

    private getUsersFromServer(filter:UserFilterObject):void {
        this.usersService.getUsers(filter)
            .then( (data:UserObject[]) => {
                this.users = data;
            });
    }
}

export var usersTabComponent:IComponentOptions = {
    controller: UsersTabComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/tabs/users.tab.template.html'
};
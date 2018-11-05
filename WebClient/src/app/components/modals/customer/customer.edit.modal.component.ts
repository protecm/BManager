import {IModalInstanceService} from "angular-ui-bootstrap";
import {AlertHelper} from "../../../helpers/alert.helper";
import {CustomerService} from "../../../services/customer.service";
import {CustomerObject} from "../../../objects/customer/customer.object";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {CustomerBaseModalComponent, CustomerBaseModalSettings} from "./customer.base.modal.component";

class CustomerEditModalComponent extends CustomerBaseModalComponent{
    public vm:CustomerEditModalComponent;

    constructor($uibModalInstance: IModalInstanceService,
                private customerService:CustomerService,
                private $translate:angular.translate.ITranslateService,
                customer:CustomerObject){

        super($uibModalInstance,customer);
        this.title = this.$translate.instant('EDIT_CUSTOMER');
    }

    public save(valid: boolean): void {
        this.alertHelper.clear();

        if (valid) {
            this.isSaveInProcess = true;
            let editedCustomer = new CustomerObject(this.id, this.name, this.phone, this.isDeleted);
            this.customerService.editCustomer(this.customer, editedCustomer).then((dbMsg: DataBaseMessageInterface<any>) => {
                this.isSaveInProcess = false;
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    this.$uibModalInstance.close(editedCustomer);
                }else if (dbMsg.code === DbMessagesConstants.CODE_MYSQL_DUPLICATE_KEY){
                    const msg = this.$translate.instant('KEY_ALREADY_EXISTS_IN_SYSTEM');
                    this.alertHelper.addAlert(AlertHelper.TYPE_DANGER,msg);
                }else {
                    //handle error
                }
            });
        }
    }
}

export class customerEditModalComponent extends CustomerBaseModalSettings {
    public controller:Function = CustomerEditModalComponent;

    constructor(customer:CustomerObject){
        super(customer);
    }
}

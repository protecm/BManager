import {IModalInstanceService} from "angular-ui-bootstrap";
import {AlertHelper} from "../../../helpers/alert.helper";
import {CustomerService} from "../../../services/customer.service";
import {CustomerObject} from "../../../objects/customer/customer.object";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {CustomerBaseModalComponent, CustomerBaseModalSettings} from "./customer.base.modal.component";

class CustomerAddModalComponent extends CustomerBaseModalComponent{
    public vm:CustomerAddModalComponent;

    constructor($uibModalInstance: IModalInstanceService,
                private customerService:CustomerService,
                private $translate:angular.translate.ITranslateService,
                customer:CustomerObject){

        super($uibModalInstance,customer);
        this.title = this.$translate.instant('ADD_CUSTOMER');
        this.id = this.$translate.instant('NEW') as any;
    }

    public save(valid: boolean): void {
        this.alertHelper.clear();

        if (valid) {
            this.isSaveInProcess = true;
            let customer = new CustomerObject(null, this.name, this.phone, this.isDeleted);
            this.customerService.addCustomer(customer).then((dbMsg: DataBaseMessageInterface<any>) => {
                this.isSaveInProcess = false;
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    customer.id = dbMsg.data;
                    this.$uibModalInstance.close(customer);
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

export class customerAddModalComponent extends CustomerBaseModalSettings {
    public controller:Function = CustomerAddModalComponent;

    constructor(customer:CustomerObject = null) {
        super(customer);
    }
}

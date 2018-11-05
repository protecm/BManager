import {IComponentOptions} from "angular";
import {CustomerObject} from "../objects/customer/customer.object";
import {CustomerService} from "../services/customer.service";
import {ModalService} from "../services/modal.service";
import {customerAddModalComponent} from "./modals/customer/customer.add.modal.component";
import {customerEditModalComponent} from "./modals/customer/customer.edit.modal.component";
import {ToastService} from "../services/toast.service";
import {ConfirmationService} from "../services/confirmation.service";
import {DataBaseMessageInterface} from "../interfaces/server.message.interface";
import {DbMessagesConstants} from "../constants/db.messages.constants";
import {CustomerFilterObject} from "../objects/customer/customer.filter.object";
import {BaseTableActionInterface} from "./tables/base.table.component";

class CustomersComponent {
    public vm:CustomersComponent;
    public customers:CustomerObject[];

    constructor(private modalService:ModalService,
                private customerService:CustomerService,
                private confirmationService:ConfirmationService,
                private $translate:angular.translate.ITranslateService,
                private toastService:ToastService){
        this.getCustomersFromServer();
    }

    public createCustomer():void {
        let options = new customerAddModalComponent();
        this.modalService.showModal<CustomerObject>(options)
            .then( (data:CustomerObject) => {
                if(data) {
                    //New customer created
                    this.addCustomer(data);
                    this.toastService.showSuccess('CREATED_SUCCESSFULLY','CUSTOMER');
                }
            },(error) => {
                //handle error/dismiss
            });
    }

    public deleteCustomerRequest:BaseTableActionInterface<CustomerObject> = (customer:CustomerObject):Promise<void> => {
        const title = this.$translate.instant('DELETE_CUSTOMER');
        const bodyMsg = this.confirmationService.getDefaultBodyTemplate(
            this.$translate.instant('CONFIRM_DELETE_CUSTOMER'),
            customer.name
        );
        return this.confirmationService.confirm(title,bodyMsg)
            .then( (result:boolean) => {
                if(result) {
                    return this.deleteCustomer(customer);
                }
            },(error) => {
                //handle error/dismiss
            });
    };

    private deleteCustomer(customer:CustomerObject):Promise<void> {
        return this.customerService.deleteCustomer(customer)
            .then( (dbMsg: DataBaseMessageInterface<any>) => {
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    //category deleted
                    customer.isDeleted = true;
                    this.removeCustomer(customer);
                    this.toastService.showSuccess('DELETED_SUCCESSFULLY','CUSTOMER');
                }else {
                    //handle error
                }
            });
    }

    public editCustomer:BaseTableActionInterface<CustomerObject> = (customer:CustomerObject):Promise<void> => {
        let options = new customerEditModalComponent(customer);
        return this.modalService.showModal<CustomerObject>(options)
            .then( (data:CustomerObject) => {
                if(data) {
                    //customer edited
                    this.updateCustomer(customer, data);
                }
            },(error) => {
                //handle error/dismiss
            });
    };

    private getCustomersFromServer():void {
        this.customerService.getCustomers( CustomerFilterObject.GetActiveCustomersFilter() )
            .then( (data:CustomerObject[]) => {
                this.customers = data;
            });
    }

    private addCustomer(customer:CustomerObject):void {
        this.customers.push(customer);
    }

    private updateCustomer(orgCustomer:CustomerObject, edtCustomer:CustomerObject):void {
        const len = this.customers.length;
        for(let i=0; i<len; i++) {
            if( this.customers[i].id === orgCustomer.id) {
                this.customers[i] = edtCustomer;
                break;
            }
        }
    }

    private removeCustomer(customer:CustomerObject):void {
        const len = this.customers.length;
        for(let i=0; i<len; i++) {
            if( this.customers[i].id === customer.id) {
                this.customers.splice(i,1);
                break;
            }
        }
    }
}

export var customersComponent:IComponentOptions = {
    controller: CustomersComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/customers.template.html'
};
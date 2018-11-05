import {IModalInstanceService} from "angular-ui-bootstrap";
import {OrderObject} from "../../../objects/order/order.object";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {OrderService} from "../../../services/order.service";
import {ProductService} from "../../../services/product.service";
import {CustomerService} from "../../../services/customer.service";
import {LoDashStatic} from "lodash";
import {OrderBaseModalComponent, OrderBaseModalSettings} from "./order.base.modal.component";
import {AlertConstants} from "../../../constants/alert.constants";
import {OrderConstants} from "../../../constants/order.constants";
import {OrderRowObject} from "../../../objects/order/order.row.object";
import {ModalService} from "../../../services/modal.service";
import {ToastService} from "../../../services/toast.service";

class OrderEditModalComponent extends OrderBaseModalComponent{
    public vm:OrderEditModalComponent;

    constructor($uibModalInstance:IModalInstanceService,
                private $translate:angular.translate.ITranslateService,
                private orderService:OrderService,
                customerService:CustomerService,
                productService:ProductService,
                modalService:ModalService,
                toastService:ToastService,
                lodash:LoDashStatic,
                order:OrderObject){

        super($uibModalInstance,customerService,productService,modalService,toastService,lodash,order);
        this.title = this.$translate.instant('EDIT_ORDER');
        this.setEditMode();
    }

    public save(valid:boolean):void {
        if(valid) {
            this.isSaveInProcess = true;
            this.mergeDateTime(this.orderDate,this.orderTime);
            this.mergeDateTime(this.supplyDate,this.supplyTime);

            const editVersion = this.version+1;
            const editOrderRows:OrderRowObject[] = this.orderRows.map(
                (x) => {
                    x.orderVersion = editVersion;
                    return x;
                });
            const recordHistory = this.order.isActive;
            const editStatus = recordHistory ? OrderConstants.STATUS_UPDATED:this.order.status;
            let editedOrder = new OrderObject(this.id, editVersion, this.selectedCustomer, this.orderDate, this.supplyDate, this.notes, editOrderRows, editStatus);

            this.orderService.editOrder(this.order, editedOrder, recordHistory).then((dbMsg: DataBaseMessageInterface<any>) => {
                this.isSaveInProcess = false;
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    this.$uibModalInstance.close(editedOrder);
                }else if (dbMsg.code === DbMessagesConstants.CODE_MYSQL_DUPLICATE_KEY){
                    //handle error
                }else {
                    //handle error
                }
            });
        }
    }

    public cancelOrder():void {
        let canceledOrder = new OrderObject(this.id, this.version, this.selectedCustomer, this.orderDate, this.supplyDate, this.notes, this.orderRows, OrderConstants.STATUS_CANCELED);

        this.orderService.updateOrderStatus(this.order, OrderConstants.STATUS_CANCELED)
            .then( (dbMsg:DataBaseMessageInterface<any>) => {
                if(dbMsg.code === DbMessagesConstants.CODE_OK) {
                    this.$uibModalInstance.close(canceledOrder);
                }else {
                    //handle error
                }
            });
    }

    private setEditMode():void {
        if(this.order && this.order.isDirty) {
            if(this.order.isInProductionMode) {
                this.disableEdit(AlertConstants.ALERT_ORDER_APPROVED);
            }else if(this.order.isSupplied) {
                this.disableEdit(AlertConstants.ALERT_ORDER_SUPPLIED);
            }else if(this.order.isInDeliveries) {
                this.disableEdit(AlertConstants.ALERT_ORDER_IN_DELIVERIES);
            }else if(this.order.isCanceled) {
                this.disableEdit(AlertConstants.ALERT_ORDER_CANCELED);
            }
        }
    }
}

export class orderEditModalComponent extends OrderBaseModalSettings {
    public controller:Function = OrderEditModalComponent;

    constructor(order:OrderObject){
        super(order);
    }
}
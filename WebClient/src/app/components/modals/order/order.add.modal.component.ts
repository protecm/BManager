import {IModalInstanceService} from "angular-ui-bootstrap";
import {OrderObject} from "../../../objects/order/order.object";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {OrderService} from "../../../services/order.service";
import {ProductService} from "../../../services/product.service";
import {CustomerService} from "../../../services/customer.service";
import {OrderBaseModalComponent, OrderBaseModalSettings} from "./order.base.modal.component";
import {LoDashStatic} from "lodash";
import {ModalService} from "../../../services/modal.service";
import {ToastService} from "../../../services/toast.service";
import {ProductObject} from "../../../objects/product/product.object";

class OrderAddModalComponent extends OrderBaseModalComponent{
    public vm:OrderAddModalComponent;

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
        this.title = this.$translate.instant('ADD_ORDER');
        this.id = this.$translate.instant('NEW') as any;
    }

    public save(valid:boolean):void {

        if(valid) {
            this.isSaveInProcess = true;
            this.mergeDateTime(this.orderDate,this.orderTime);
            this.mergeDateTime(this.supplyDate,this.supplyTime);
            let order = new OrderObject(null, this.version, this.selectedCustomer, this.orderDate, this.supplyDate, this.notes, this.orderRows);

            this.orderService.addOrder(order).then((dbMsg: DataBaseMessageInterface<any>) => {
                this.isSaveInProcess = false;
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    order.id = dbMsg.data;
                    this.$uibModalInstance.close(order);
                }else if (dbMsg.code === DbMessagesConstants.CODE_MYSQL_DUPLICATE_KEY){
                    //handle error
                }else {
                    //handle error
                }
            });
        }
    }
}

export class orderAddModalComponent extends OrderBaseModalSettings {
    public controller:Function = OrderAddModalComponent;

    constructor(order:OrderObject){
        super(order);
    }
}
import {IModalInstanceService} from "angular-ui-bootstrap";
import {OrderBaseModalComponent, OrderBaseModalSettings} from "./order.base.modal.component";
import {CustomerService} from "../../../services/customer.service";
import {ProductService} from "../../../services/product.service";
import {LoDashStatic} from "lodash";
import {OrderObject} from "../../../objects/order/order.object";
import {AlertConstants} from "../../../constants/alert.constants";
import {ModalService} from "../../../services/modal.service";
import {ToastService} from "../../../services/toast.service";

class OrderViewModalComponent extends OrderBaseModalComponent {

    constructor($uibModalInstance:IModalInstanceService,
                private $translate:angular.translate.ITranslateService,
                customerService:CustomerService,
                productService:ProductService,
                modalService:ModalService,
                toastService:ToastService,
                lodash:LoDashStatic,
                order:OrderObject) {
        super($uibModalInstance,customerService,productService,modalService,toastService,lodash,order);
        this.title = this.$translate.instant('VIEW_ORDER');
        this.disableEdit(AlertConstants.ALERT_ORDER_VIEW_MODE);
    }

    public save(valid:boolean):void {
        //  View mode - no action needed
    }
}

export class orderViewModalComponent extends OrderBaseModalSettings {
    public controller:Function = OrderViewModalComponent;

    constructor(order:OrderObject){
        super(order);
    }
}
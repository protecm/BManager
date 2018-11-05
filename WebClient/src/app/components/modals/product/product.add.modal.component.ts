import {IModalInstanceService} from "angular-ui-bootstrap";
import {ProductObject} from "../../../objects/product/product.object";
import {CategoryService} from "../../../services/category.service";
import {ProductService} from "../../../services/product.service";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {AlertHelper} from "../../../helpers/alert.helper";
import {ProductBaseModalComponent, ProductBaseModalSettings} from "./product.base.modal.component";
import {ModalService} from "../../../services/modal.service";
import {ToastService} from "../../../services/toast.service";

class ProductAddModalComponent extends ProductBaseModalComponent{
    public vm:ProductAddModalComponent;

    constructor($uibModalInstance:IModalInstanceService,
                modalService:ModalService,
                categoryService:CategoryService,
                toastService:ToastService,
                private productService:ProductService,
                private $translate:angular.translate.ITranslateService,
                product:ProductObject){

        super($uibModalInstance,modalService,categoryService,toastService,product);
        this.title = this.$translate.instant('ADD_PRODUCT');
        this.id = this.$translate.instant('NEW') as any;
    }

    public save(valid:boolean):void {
        this.alertHelper.clear();

        if(valid) {
            this.isSaveInProcess = true;
            let product = new ProductObject(null,this.selectedCategory,this.name,this.isDeleted);

            this.productService.addProduct(product).then((dbMsg: DataBaseMessageInterface<any>) => {
                this.isSaveInProcess = false;
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    product.id = dbMsg.data;
                    this.$uibModalInstance.close(product);
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

export class productAddModalComponent extends ProductBaseModalSettings{
    public controller:Function = ProductAddModalComponent;

    constructor(product:ProductObject =null){
        super(product);
    }
}

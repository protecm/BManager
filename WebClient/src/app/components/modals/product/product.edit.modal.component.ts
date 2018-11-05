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

class ProductEditModalComponent extends ProductBaseModalComponent{
    public vm:ProductEditModalComponent;

    constructor($uibModalInstance:IModalInstanceService,
                modalService:ModalService,
                categoryService:CategoryService,
                toastService:ToastService,
                private productService:ProductService,
                private $translate:angular.translate.ITranslateService,
                product:ProductObject){

        super($uibModalInstance,modalService,categoryService,toastService,product);
        this.title = this.$translate.instant('EDIT_PRODUCT');
    }

    public save(valid:boolean):void {
        this.alertHelper.clear();

        if(valid) {
            this.isSaveInProcess = true;
            let editedProduct = new ProductObject(this.id,this.selectedCategory,this.name,this.isDeleted);

            this.productService.editProduct(this.product, editedProduct).then((dbMsg: DataBaseMessageInterface<any>) => {
                this.isSaveInProcess = false;
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    this.$uibModalInstance.close(editedProduct);
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

export class productEditModalComponent extends ProductBaseModalSettings {
    public controller:Function = ProductEditModalComponent;

    constructor(product:ProductObject){
        super(product);
    }
}

import {IComponentController, IComponentOptions} from "angular";
import {ModalService} from "../../services/modal.service";
import {productAddModalComponent} from "../modals/product/product.add.modal.component";
import {ProductObject} from "../../objects/product/product.object";
import {ProductService} from "../../services/product.service";
import {productEditModalComponent} from "../modals/product/product.edit.modal.component";
import {ToastService} from "../../services/toast.service";
import {TabComponentInterface} from "../../interfaces/tab.manager.interface";
import {ConfirmationService} from "../../services/confirmation.service";
import {DataBaseMessageInterface} from "../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../constants/db.messages.constants";
import {ProductFilterObject} from "../../objects/product/product.filter.object";
import {BaseTableActionInterface} from "../tables/base.table.component";

class ProductsTabComponent implements TabComponentInterface,IComponentController {
    public vm:ProductsTabComponent;
    public tabIndex:number;
    public products:ProductObject[];

    constructor(private modalService:ModalService,
                private productService:ProductService,
                private confirmationService:ConfirmationService,
                private $translate:angular.translate.ITranslateService,
                private toastService:ToastService){
        this.getProductsFromServer();
    }

    public createProduct():void {
        let options = new productAddModalComponent();
        this.modalService.showModal<ProductObject>(options)
            .then( (data:ProductObject) => {
                if(data) {
                    //New product created
                    this.addProduct(data);
                    this.toastService.showSuccess('CREATED_SUCCESSFULLY','PRODUCT');
                }
            },(error) => {
                //handle error/dismiss
            });
    }

    public deleteProductRequest:BaseTableActionInterface<ProductObject> = (product:ProductObject):Promise<void> => {
        const title = this.$translate.instant('DELETE_PRODUCT');
        const bodyMsg = this.confirmationService.getDefaultBodyTemplate(
            this.$translate.instant('CONFIRM_DELETE_PRODUCT'),
            product.name
        );
        return this.confirmationService.confirm(title,bodyMsg)
            .then( (result:boolean) => {
                if(result) {
                    return this.deleteProduct(product);
                }
            },(error) => {
                //handle error/dismiss
            });
    };

    private deleteProduct(product:ProductObject):Promise<void> {
        return this.productService.deleteProduct(product)
            .then( (dbMsg: DataBaseMessageInterface<any>) => {
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    //category deleted
                    product.isDeleted = true;
                    this.removeProduct(product);
                    this.toastService.showSuccess('DELETED_SUCCESSFULLY','PRODUCT');
                }else {
                    //handle error
                }
            });
    }

    public editProduct:BaseTableActionInterface<ProductObject> = (product:ProductObject):Promise<void> => {
        let options = new productEditModalComponent(product);
        return this.modalService.showModal<ProductObject>(options)
            .then( (data:ProductObject) => {
                if(data) {
                    //product edited
                    this.updateProduct(product, data);
                }
            },(error) => {
                //handle error/dismiss
            });
    };

    private getProductsFromServer():void {
        this.productService.getProducts( ProductFilterObject.GetActiveProductsFilter() )
            .then( (data:ProductObject[]) => {
                this.products = data;
            });
    }

    private addProduct(product:ProductObject):void {
        this.products.push(product);
    }

    private updateProduct(orgProduct:ProductObject, edtProduct:ProductObject):void {
        const len = this.products.length;
        for(let i=0; i<len; i++) {
            if( this.products[i].id === orgProduct.id) {
                this.products[i] = edtProduct;
                break;
            }
        }
    }

    private removeProduct(product:ProductObject):void {
        const len = this.products.length;
        for(let i=0; i<len; i++) {
            if( this.products[i].id === product.id) {
                this.products.splice(i,1);
                break;
            }
        }
    }

    public $onInit():void {
        this.productService.registerListener(this.tabIndex, () => {
            this.getProductsFromServer();
        });
    }

    public $onDestroy():void {
        this.productService.removeListener(this.tabIndex);
    }
}

export var productsTabComponent:IComponentOptions = {
    controller: ProductsTabComponent,
    controllerAs: 'vm',
    bindings: {
        tabIndex: '<'
    },
    templateUrl: 'app/templates/tabs/products.tab.template.html'
};
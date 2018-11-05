import {IComponentController, IComponentOptions} from "angular";
import {ModalService} from "../../services/modal.service";
import {categoryAddModalComponent} from "../modals/category/category.add.modal.component";
import {CategoryObject} from "../../objects/category.object";
import {CategoryService} from "../../services/category.service";
import {categoryEditModalComponent} from "../modals/category/category.edit.modal.component";
import {ToastService} from "../../services/toast.service";
import {TabComponentInterface} from "../../interfaces/tab.manager.interface";
import {DataBaseMessageInterface} from "../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../constants/db.messages.constants";
import {ConfirmationService} from "../../services/confirmation.service";

class CategoriesTabComponent implements TabComponentInterface,IComponentController {
    public vm:CategoriesTabComponent;

    public tabIndex:number;
    public filterCategory:CategoryObject;
    public categories:CategoryObject[];
    public isDeleteInProcess = {};

    constructor(private modalService:ModalService,
                private categoryService:CategoryService,
                private confirmationService:ConfirmationService,
                private $translate:angular.translate.ITranslateService,
                private toastService:ToastService){
        this.getCategoriesFromServer();
    }

    public createCategory():void {
        let options = new categoryAddModalComponent();
        this.modalService.showModal<CategoryObject>(options)
            .then( (data:CategoryObject) => {
                if(data) {
                    //New category created
                    this.addCategory(data);
                    this.toastService.showSuccess('CREATED_SUCCESSFULLY','CATEGORY');
                }
            }, (error) => {
                //handle error/dismiss
            });
    }

    public deleteCategoryRequest(category:CategoryObject):void {
        const title = this.$translate.instant('DELETE_CATEGORY');
        const bodyMsg = this.confirmationService.getDefaultBodyTemplate(
            this.$translate.instant('CONFIRM_DELETE_CATEGORY'),
            category.name
        );
        this.confirmationService.confirm(title,bodyMsg)
            .then( (result:boolean) => {
                if(result) {
                    this.deleteCategory(category);
                }
            },(error) => {
                //handle error/dismiss
            });
    }

    private deleteCategory(category:CategoryObject):void {
        this.isDeleteInProcess[category.id] = true;
        this.categoryService.deleteCategory(category)
            .then( (dbMsg: DataBaseMessageInterface<any>) => {
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    //category deleted
                    category.isDeleted = true;
                    this.removeCategory(category);
                    this.toastService.showSuccess('DELETED_SUCCESSFULLY','CATEGORY');
                }else {
                    //handle error
                }
                this.isDeleteInProcess[category.id] = false;
            });
    }

    public editCategory(category:CategoryObject):void {
        let options = new categoryEditModalComponent(category);
        this.modalService.showModal<CategoryObject>(options)
            .then( (data:CategoryObject) => {
                if(data) {
                    //category edited
                    this.updateCategory(category, data);
                }
            },(error) => {
                //handle error/dismiss
            });
    }

    private getCategoriesFromServer():void {
        this.categoryService.getCategories()
            .then( (data:CategoryObject[]) => {
                this.categories = data;
            });
    }

    private addCategory(category:CategoryObject):void {
        this.categories.push(category);
    }

    private updateCategory(orgCategory:CategoryObject, edtCategory:CategoryObject):void {
        const len = this.categories.length;
        for(let i=0; i<len; i++) {
            if( this.categories[i].id === orgCategory.id) {
                this.categories[i] = edtCategory;
                break;
            }
        }
    }

    private removeCategory(category:CategoryObject):void {
        const len = this.categories.length;
        for(let i=0; i<len; i++) {
            if( this.categories[i].id === category.id) {
                this.categories.splice(i,1);
                break;
            }
        }
    }

    public $onInit():void {
        this.categoryService.registerListener(this.tabIndex, () => {
            this.getCategoriesFromServer();
        });
    }

    public $onDestroy():void {
        this.categoryService.removeListener(this.tabIndex);
    }
}

export var categoriesTabComponent:IComponentOptions = {
    controller: CategoriesTabComponent,
    controllerAs: 'vm',
    bindings: {
        tabIndex: '<'
    },
    templateUrl:  'app/templates/tabs/categories.tab.template.html'
};
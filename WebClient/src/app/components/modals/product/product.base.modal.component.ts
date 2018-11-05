import {AlertHelper} from "../../../helpers/alert.helper";
import {CategoryObject} from "../../../objects/category.object";
import {IModalInstanceService, IModalSettings} from "angular-ui-bootstrap";
import {CategoryService} from "../../../services/category.service";
import {ProductObject} from "../../../objects/product/product.object";
import {ModalService} from "../../../services/modal.service";
import {categoryAddModalComponent} from "../category/category.add.modal.component";
import {ToastService} from "../../../services/toast.service";

export abstract class ProductBaseModalComponent {
    public title:string;
    public id:number;
    public selectedCategory:CategoryObject;
    public categories:CategoryObject[];
    public name:string;
    public isDeleted:boolean;
    public isSaveInProcess:boolean;
    public alertHelper:AlertHelper;

    constructor(protected $uibModalInstance:IModalInstanceService,
                protected modalService:ModalService,
                protected categoryService:CategoryService,
                protected toastService:ToastService,
                public product:ProductObject) {

        if(this.product) {
            this.id = this.product.id;
            this.name = this.product.name;
            this.isDeleted = this.product.isDeleted;
        }else {
            this.isDeleted = false;
        }
        this.getCategoriesFromServer()
            .then( (data:CategoryObject[]) => {
                if(this.product) {
                    this.selectedCategory = this.product.category;
                }
            });
        this.alertHelper = new AlertHelper();
    }

    public abstract save(valid:boolean):void;

    public createCategory(uiSelectController:any,categoryName:string):Promise<boolean> {
        let category = new CategoryObject(null, categoryName, false);
        let options = new categoryAddModalComponent(category);
        return this.modalService.showModal<CategoryObject>(options)
            .then( (data:CategoryObject) => {
                if(data) {
                    //New category created
                    this.categories.push(data);
                    this.selectedCategory = data;
                    uiSelectController.close(); // ui-select controller
                    this.toastService.showSuccess('CREATED_SUCCESSFULLY','CATEGORY');
                }
                return true;
            }, (error) => {
                //handle error/dismiss
                return false;
            });
    }

    public cancel():void {
        this.$uibModalInstance.dismiss();
    }

    private getCategoriesFromServer():Promise<CategoryObject[]> {
        return this.categoryService.getCategories()
            .then( (data:CategoryObject[]) => {
                return this.categories = data;
            });
    }
}

export class ProductBaseModalSettings implements IModalSettings {

    public animation:boolean = true;
    public backdrop:boolean|string = 'static';
    public controller:Function = ProductBaseModalComponent;
    public bindToController:boolean = true;
    public controllerAs:string = 'vm';
    public templateUrl:string = 'app/templates/modals/product.modal.template.html';
    public resolve:any;

    constructor(product:ProductObject){
        this.resolve = {
            product: () => {return product;}
        };
    }
}
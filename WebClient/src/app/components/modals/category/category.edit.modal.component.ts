import {IModalInstanceService} from "angular-ui-bootstrap";
import {CategoryObject} from "../../../objects/category.object";
import {CategoryService} from "../../../services/category.service";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {AlertHelper} from "../../../helpers/alert.helper";
import {CategoryBaseModalComponent, CategoryBaseModalSettings} from "./category.base.modal.component";

class CategoryEditModalComponent extends CategoryBaseModalComponent{
    public vm: CategoryEditModalComponent;

    constructor($uibModalInstance: IModalInstanceService,
                private categoryService: CategoryService,
                private $translate:angular.translate.ITranslateService,
                category:CategoryObject) {

        super($uibModalInstance,category);
        this.title = this.$translate.instant('EDIT_CATEGORY');
    }

    public save(valid: boolean): void {
        this.alertHelper.clear();

        if (valid) {
            this.isSaveInProcess = true;
            let editedCategory = new CategoryObject(this.id, this.name, this.isDeleted);
            this.categoryService.editCategory(this.category, editedCategory).then((dbMsg: DataBaseMessageInterface<any>) => {
                this.isSaveInProcess = false;
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    this.$uibModalInstance.close(editedCategory);
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

export class categoryEditModalComponent extends CategoryBaseModalSettings {
    public controller:Function = CategoryEditModalComponent;

    constructor(category:CategoryObject){
        super(category);
    }
}
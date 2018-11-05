import {IModalInstanceService} from "angular-ui-bootstrap";
import {CategoryObject} from "../../../objects/category.object";
import {CategoryService} from "../../../services/category.service";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {AlertHelper} from "../../../helpers/alert.helper";
import {CategoryBaseModalComponent, CategoryBaseModalSettings} from "./category.base.modal.component";

class CategoryAddModalComponent extends CategoryBaseModalComponent{
    public vm: CategoryAddModalComponent;

    constructor($uibModalInstance: IModalInstanceService,
                private categoryService: CategoryService,
                private $translate:angular.translate.ITranslateService,
                category:CategoryObject) {

        super($uibModalInstance,category);
        this.title = this.$translate.instant('ADD_CATEGORY');
        this.id = this.$translate.instant('NEW') as any;
    }

    public save(valid: boolean): void {
        this.alertHelper.clear();

        if (valid) {
            this.isSaveInProcess = true;
            let category = new CategoryObject(null, this.name, this.isDeleted);
            this.categoryService.addCategory(category).then((dbMsg: DataBaseMessageInterface<any>) => {
                this.isSaveInProcess = false;
                if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                    category.id = dbMsg.data;
                    this.$uibModalInstance.close(category);
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


export class categoryAddModalComponent extends CategoryBaseModalSettings {
    public controller:Function = CategoryAddModalComponent;

    constructor(category:CategoryObject = null) {
        super(category);
    }
}
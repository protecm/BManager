import {IModalInstanceService,IModalSettings} from "angular-ui-bootstrap";
import {OrderObject} from "../../../objects/order/order.object";
import {LoDashStatic} from "lodash";
import {OrderComparatorObject} from "../../../objects/order/order.comparator.object";
import {MonitorService} from "../../../services/monitor.service";
import {OrderConstants} from "../../../constants/order.constants";
import {LanguageService} from "../../../services/language.service";
import {LanguageDirection} from "../../../interfaces/language.interface";

class OrderApproveUpdatedModalComponent {

    public title:string;
    public isApproveInProgress:boolean;
    public compareRes:OrderComparatorObject;

    constructor(private $uibModalInstance:IModalInstanceService,
                private monitorService:MonitorService,
                private languageService:LanguageService,
                private $translate:angular.translate.ITranslateService,
                private lodash:LoDashStatic,
                public currOrder:OrderObject,
                public prevOrder:OrderObject){
        this.title = this.$translate.instant('APPROVE_ORDER');
        this.compareRes = new OrderComparatorObject(prevOrder,currOrder,this.lodash).compare();
    }

    public get arrowDirection():string {
        if(this.languageService.language.direction === LanguageDirection.RTL) {
            return 'left';
        }
        return 'right';
    }

    public approve(valid:boolean):void {
        if(valid) {
            this.isApproveInProgress = true;
            //Update Server, Detect status of order, check rows...
            const rowsStatus = this.currOrder.getOrderRowsStatus();
            const orderStatus = rowsStatus === OrderConstants.STATUS_NEW ?
                                                        OrderConstants.STATUS_APPROVED:rowsStatus;
            this.monitorService.updateOrderStatus(this.currOrder,orderStatus)
                .then( (result:boolean) => {
                    this.isApproveInProgress = false;
                    if(result) {
                        this.$uibModalInstance.close(orderStatus);
                    }else {
                        //handle error
                    }
                });
        }
    }

    public cancel():void {
        this.$uibModalInstance.dismiss();
    }
}

export class orderApproveUpdatedModalComponent implements IModalSettings {

    public animation:boolean = true;
    public backdrop:boolean|string = 'static';
    public controller:Function = OrderApproveUpdatedModalComponent;
    public bindToController:boolean = true;
    public controllerAs:string = 'vm';
    public templateUrl:string = 'app/templates/modals/order.approve.updated.modal.template.html';
    public size:string = 'lg';
    public resolve:any;

    constructor(currOrder:OrderObject, prevOrder:OrderObject){
        this.resolve = {
            currOrder: () => {return currOrder;},
            prevOrder: () => {return prevOrder;}
        };
    }
}
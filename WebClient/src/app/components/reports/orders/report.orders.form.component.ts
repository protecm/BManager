import {IComponentController, IComponentOptions} from "angular";
import {ReportConstants, ReportType} from "../../../constants/report.constants";
import {ReportFormCtrlInterface} from "../../../interfaces/report.form.ctrl.interface";
import {CustomerObject} from "../../../objects/customer/customer.object";
import {CustomerService} from "../../../services/customer.service";
import {CustomerFilterObject} from "../../../objects/customer/customer.filter.object";
import {OrderObject} from "../../../objects/order/order.object";
import {OrderService} from "../../../services/order.service";
import {OrderFilterObject} from "../../../objects/order/order.filter.object";
import {OrderConstants, OrderStatus} from "../../../constants/order.constants";
import {IDatepickerConfig} from "angular-ui-bootstrap";
import {DateHelper} from "../../../helpers/date.helper";
import {ReportContainer} from "../report.component";
import {ReportFormDataInterface} from "../../../interfaces/report.result.ctrl.interface";
import {ProductObject} from "../../../objects/product/product.object";
import {ProductService} from "../../../services/product.service";
import {ProductFilterObject} from "../../../objects/product/product.filter.object";
import {ReportOrdersGroupByConstants, ReportOrdersGroupByInterface} from "./report.orders.group.by.constants";

export interface ReportOrdersFormSettingsInterface {
    showProducts:boolean;
    hideProducts:boolean;
    groupBy:ReportOrdersGroupByInterface;
}

//TODO - create base class for component default behavior - onInit... register to parent & IComponent options
class ReportOrdersFormComponent implements IComponentController,ReportFormCtrlInterface<OrderObject,ReportOrdersFormSettingsInterface> {

    private parent:ReportContainer;          //From component require
    public  isVisible:boolean;
    public  isGenerateInProcess:boolean;

    public isFromDateOpened:boolean;
    public isToDateOpened:boolean;
    public fromDate:Date;
    public toDate:Date;
    public dateOptions:IDatepickerConfig;

    public selectedCustomer:CustomerObject;
    public customers:CustomerObject[];

    public selectedProduct:ProductObject;
    public products:ProductObject[];

    public selectedGroupBy:ReportOrdersGroupByInterface;
    public groupByOptions:ReportOrdersGroupByInterface[];

    public selectedOrderStatus:OrderStatus;
    public orderStatuses:OrderStatus[];
    public showProducts:boolean;
    public hideProducts:boolean;

    constructor(private customerService:CustomerService,
                private productService:ProductService,
                private orderService:OrderService) {
        this.getCustomersFromServer();
        this.getProductsFromServer();
        this.orderStatuses = OrderConstants.STATUS_LIST;
        this.groupByOptions = ReportOrdersGroupByConstants.GROUP_BY_LIST;
        this.selectedGroupBy = ReportOrdersGroupByConstants.GROUP_BY_DEFAULT;
        this.dateOptions = DateHelper.GetDefaultDateOptions();
    }

    public get type():ReportType {
        return ReportConstants.TYPE_ORDERS;
    }

    public generate():Promise<ReportFormDataInterface<OrderObject,ReportOrdersFormSettingsInterface>> {
        this.isGenerateInProcess = true;
        const filter = OrderFilterObject.Create();
        filter.orderFromDate = this.fromDate ? this.fromDate:null;
        /* Selected dates with bootstrap's 'uib-datepicker' are created with 00:00:00 time,
        to get the orders with the 'toDate' value we will filter with the next day */
        filter.orderToDate = this.toDate ? DateHelper.GetTomorrowDate(this.toDate):null;
        filter.customer = this.selectedCustomer;
        filter.product = this.selectedProduct;
        filter.status = this.selectedOrderStatus;

        return this.getOrdersFromServer(filter)
            .then( (data:OrderObject[]) => {
                this.isGenerateInProcess = false;
                return {
                    data: data,
                    settings: {
                        showProducts: this.showProducts,
                        hideProducts: this.hideProducts,    //TODO - add component to view
                        groupBy: this.showProducts ? this.selectedGroupBy:ReportOrdersGroupByConstants.GROUP_BY_DEFAULT
                    }
                };
            });
    }

    private getOrdersFromServer(filter:OrderFilterObject):Promise<OrderObject[]> {
        return this.orderService.getOrders(filter);
    }

    private getCustomersFromServer():void {
        this.customerService.getCustomers( CustomerFilterObject.GetActiveCustomersFilter() )
            .then( (data:CustomerObject[]) => {
                this.customers = data;
            });
    }

    private getProductsFromServer():void {
        this.productService.getProducts( ProductFilterObject.GetActiveProductsFilter() )
            .then( (data:ProductObject[]) => {
                this.products = data;
            });
    }

    public get isGroupByProducts():boolean {
        return this.selectedGroupBy && (this.selectedGroupBy.id === ReportOrdersGroupByConstants.GROUP_BY_PRODUCTS.id);
    }

    public $onInit():void {
        if(this.parent) {
            this.parent.registerFormCtrl(this);
        }
    }

    public $onDestroy():void {
    }
}

export var reportOrdersFormComponent:IComponentOptions = {
    controller: ReportOrdersFormComponent,
    controllerAs: 'vm',
    require: {
        parent: '^report'
    },
    templateUrl: 'app/templates/reports/report.orders.form.template.html'
};
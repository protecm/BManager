import {IDatepickerConfig, IModalInstanceService, IModalSettings} from "angular-ui-bootstrap";
import {CustomerObject} from "../../../objects/customer/customer.object";
import {OrderRowObject} from "../../../objects/order/order.row.object";
import {ProductObject} from "../../../objects/product/product.object";
import {OrderObject} from "../../../objects/order/order.object";
import {LoDashStatic} from "lodash";
import {CustomerService} from "../../../services/customer.service";
import {ProductService} from "../../../services/product.service";
import {AlertInterface} from "../../../helpers/alert.helper";
import {customerAddModalComponent} from "../customer/customer.add.modal.component";
import {ModalService} from "../../../services/modal.service";
import {ToastService} from "../../../services/toast.service";
import {productAddModalComponent} from "../product/product.add.modal.component";
import {OrderNoteObject} from "../../../objects/order/order.note.object";
import {ProductFilterObject} from "../../../objects/product/product.filter.object";
import {CustomerFilterObject} from "../../../objects/customer/customer.filter.object";

export abstract class OrderBaseModalComponent {
    public title:string;
    public id:number;
    public version:number;
    public selectedCustomer:CustomerObject;
    public orderDate:Date;
    public orderTime:Date;
    public isOrderDateOpened:boolean;
    public supplyDate:Date;
    public supplyTime:Date;
    public isSupplyDateOpened:boolean;
    public notes:OrderNoteObject;
    public orderRows:OrderRowObject[];

    public customers:CustomerObject[];
    public products:ProductObject[];
    public isSaveInProcess:boolean;
    public isEditDisabled:boolean;
    public alert:AlertInterface;

    public dateOptions:IDatepickerConfig = {
        formatDay: 'dd',
        formatMonth: 'MM',
        formatYear: 'yyyy',
        startingDay: 0
    };

    constructor(protected $uibModalInstance:IModalInstanceService,
                protected customerService:CustomerService,
                protected productService:ProductService,
                protected modalService:ModalService,
                protected toastService:ToastService,
                protected lodash:LoDashStatic,
                public order:OrderObject){
        this.initView();
    }

    private initView():void {
        let orderCopy:OrderObject;
        if(this.order) {
            orderCopy = this.lodash.cloneDeep(this.order);
            this.id = orderCopy.id;
            this.version = orderCopy.version;
            this.orderDate = orderCopy.orderDate;
            this.orderTime = orderCopy.orderDate;
            this.supplyDate = orderCopy.supplyDate;
            this.supplyTime = orderCopy.supplyDate;
            this.notes = orderCopy.notes;
        }else {
            this.version = 0;
            this.orderDate = new Date();
            this.orderTime = new Date();
            this.notes = new OrderNoteObject('',false);
            this.orderRows = [];
            this.addOrderRow();
        }
        this.getCustomersFromServer()
            .then( (data:CustomerObject[]) => {
                if(orderCopy) {
                    this.selectedCustomer = orderCopy.customer;
                }
            });

        this.getProductsFromServer()
            .then( (data:ProductObject[]) => {
                if(orderCopy) {
                    this.orderRows = orderCopy.orderRows;
                }
                //TODO - code review - consider always adding one row from start...
                //If there are rows they will override the array of rows.
                if(this.orderRows.length === 0) this.addOrderRow();
            });
    }

    public abstract save(valid:boolean):void;

    public createCustomer(uiSelectController:any,customerName:string):Promise<boolean> {
        let customer = new CustomerObject(null, customerName,'',false);
        let options = new customerAddModalComponent(customer);
        return this.modalService.showModal<CustomerObject>(options)
            .then( (data:CustomerObject) => {
                if(data) {
                    //New customer created
                    this.customers.push(data);
                    this.selectedCustomer = data;
                    uiSelectController.close(); // ui-select controller
                    this.toastService.showSuccess('CREATED_SUCCESSFULLY','CUSTOMER');
                }
                return true;
            }, (error) => {
                //handle error/dismiss
                return false;
            });
    }

    public createProduct(row:OrderRowObject,uiSelectController:any,productName:string):Promise<boolean> {
        let product = new ProductObject(null, null,productName,false);
        let options = new productAddModalComponent(product);
        return this.modalService.showModal<ProductObject>(options)
            .then( (data:ProductObject) => {
                if(data) {
                    //New customer created
                    this.products.push(data);
                    row.product = data;
                    uiSelectController.close(); // ui-select controller
                    this.toastService.showSuccess('CREATED_SUCCESSFULLY','PRODUCT');
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

    public get shouldHideOrderActions():boolean {
        return this.isEditDisabled || !this.order || (this.order.id === null);
    }

    public enableEdit():void {
        this.isEditDisabled = false;
    }

    protected disableEdit(alert:AlertInterface):void {
        this.isEditDisabled = true;
        this.alert = alert;
    }

    private getCustomersFromServer():Promise<CustomerObject[]> {
        return this.customerService.getCustomers( CustomerFilterObject.GetActiveCustomersFilter() )
            .then( (data:CustomerObject[]) => {
                return this.customers = data;
            });
    }

    private getProductsFromServer():Promise<ProductObject[]> {
        return this.productService.getProducts( ProductFilterObject.GetActiveProductsFilter() )
            .then( (data:ProductObject[]) => {
                return this.products = data;
            });
    }

    protected mergeDateTime(dateObj:Date,timeObj:Date):void {
        dateObj.setHours(timeObj.getHours());
        dateObj.setMinutes(timeObj.getMinutes());
        dateObj.setSeconds(timeObj.getSeconds());
    }

    public addOrderRow():void {
        //TODO - code review, in edit mode we have order id!!! but we are creating row with null order id,
        //from looking at the server, we are always using orderID of order and not row!!
        const rowNumber = this.orderRows.length + 1;
        let row = new OrderRowObject(null,this.version,rowNumber,null,0,
            new OrderNoteObject('',false));
        this.orderRows.push(row);
    }

    public removeOrderRow(pos:number):void {
        this.orderRows.splice(pos,1);

        //correct row numbers
        const len = this.orderRows.length;
        for(let i=pos; i<len; i++) {
            this.orderRows[i].rowNumber--;
        }
    }
}

export class OrderBaseModalSettings implements IModalSettings {

    public animation:boolean = true;
    public backdrop:boolean|string = 'static';
    public controller:Function = OrderBaseModalComponent;
    public bindToController:boolean = true;
    public controllerAs:string = 'vm';
    public templateUrl:string = 'app/templates/modals/order.modal.template.html';
    public size:string = 'lg';
    public resolve:any;

    constructor(order:OrderObject){
        this.resolve = {
            order: () => {return order;}
        };
    }
}
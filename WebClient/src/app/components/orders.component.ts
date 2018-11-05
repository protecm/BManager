import {IComponentOptions} from "angular";
import {IDatepickerConfig} from "angular-ui-bootstrap";
import {ModalService} from "../services/modal.service";
import {orderAddModalComponent} from "./modals/order/order.add.modal.component";
import {OrderObject} from "../objects/order/order.object";
import {OrderService} from "../services/order.service";
import {orderEditModalComponent} from "./modals/order/order.edit.modal.component";
import {OrderFilterObject} from "../objects/order/order.filter.object";
import {DateHelper} from "../helpers/date.helper";
import {ToastService} from "../services/toast.service";
import {ProductObject} from "../objects/product/product.object";
import {ToggleBtnInterface} from "./common/bm.toggle.btn.component";
import {OrderRowObject} from "../objects/order/order.row.object";
import {OrderNoteObject} from "../objects/order/order.note.object";
import {BaseTableActionInterface} from "./tables/base.table.component";

class OrdersComponent {
    public vm:OrdersComponent;
    public isFromDateOpened:boolean;
    public isToDateOpened:boolean;
    public fromDate:Date;
    public toDate:Date;
    public orders:OrderObject[];
    public commonProducts:ToggleBtnInterface<ProductObject>[];
    public isLoadingOrders:boolean;

    public dateOptions:IDatepickerConfig;

    constructor(private modalService:ModalService,
                private orderService:OrderService,
                private toastService:ToastService){

        this.getOrdersFromServer( OrderFilterObject.GetCurrentMonthOrdersFilter() )
            .then( (data:OrderObject[]) => {
                /* */
            });
        this.getCommonOrderedProductsFromServer();

        this.dateOptions = DateHelper.GetDefaultDateOptions();
        this.fromDate = DateHelper.GetFirstDateOfMonth();
        this.toDate = DateHelper.GetLastDateOfMonth();
    }

    public createOrder():void {
        //TODO - code review
        /*  Quick products selection Processor */
        let quickOrder = new OrderObject(null,0,null,new Date(),null,
            new OrderNoteObject('',false),[]);
        if(this.commonProducts) {
            const len = this.commonProducts.length;
            let rowCounter = 1;
            for(let i=0;i<len; i++) {
                const commonP = this.commonProducts[i];
                if(commonP.isSelected) {
                    const oRow = new OrderRowObject(null,0,rowCounter++,commonP.data,0,
                        new OrderNoteObject('',false));
                    quickOrder.orderRows.push(oRow);
                }
            }
        }
        /*  Open creation modal  */
        let options = new orderAddModalComponent(quickOrder);
        this.modalService.showModal<OrderObject>(options)
            .then( (data:OrderObject) => {
                if(data) {
                    //New order created
                    this.addOrder(data);
                    this.toastService.showSuccess('CREATED_SUCCESSFULLY','ORDER');
                }
            },(error) => {
                //handle error/dismiss
            }).then( () => {
                //TODO - code review
                //Finally
                this.clearCommonProductsSelection();
            });
    }

    public editOrder:BaseTableActionInterface<OrderObject> = (order:OrderObject):Promise<void> => {
        let options = new orderEditModalComponent(order);
        return this.modalService.showModal<OrderObject>(options)
            .then( (data:OrderObject) => {
                if(data) {
                    //order edited
                    this.updateOrder(order, data);
                }
            },(error) => {
                //handle error/dismiss
            });
    };

    public getOrdersBetweenDates(valid:boolean):void {
        if(valid) {
            this.isLoadingOrders = true;
            /* Selected dates with bootstrap's 'uib-datepicker' are created with 00:00:00 time,
            to get the orders with the 'toDate' value we will filter with the next day */
            const toDateTomorrow = DateHelper.GetTomorrowDate(this.toDate);

            const filter = new OrderFilterObject(this.fromDate,toDateTomorrow);
            this.getOrdersFromServer(filter)
                .then( (data:OrderObject[]) => {
                    this.isLoadingOrders = false;
                });
        }
    }

    private getOrdersFromServer(filter:OrderFilterObject):Promise<OrderObject[]> {
        return this.orderService.getOrders(filter)
            .then( (data:OrderObject[]) => {
                return this.orders = data;
            });
    }

    private getCommonOrderedProductsFromServer():void {
        this.orderService.getCommonProducts()
            .then( (data:ProductObject[]) => {
                if(data) {
                    this.commonProducts = this.productsToToggleBtns(data);
                }
            });
    }

    private productsToToggleBtns(products:ProductObject[]):ToggleBtnInterface<ProductObject>[] {
        let arr:ToggleBtnInterface<ProductObject>[] = [];
        for(let i=0; i<products.length; i++) {
            arr.push({
                data: products[i],
                msg: products[i].name,
                isSelected: false
            });
        }
        return arr;
    }

    private clearCommonProductsSelection():void {
        //TODO - code review
        this.commonProducts.forEach( function (row, ind, arr) {
            row.isSelected = false;
        });
    }

    private addOrder(order:OrderObject):void {
        this.orders.push(order);
    }

    private updateOrder(orgOrder:OrderObject, edtOrder:OrderObject):void {
        const len = this.orders.length;
        for(let i=0; i<len; i++) {
            if( this.orders[i].id === orgOrder.id) {
                this.orders[i] = edtOrder;
                break;
            }
        }
    }
}

export var ordersComponent:IComponentOptions = {
    controller: OrdersComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/orders.template.html'
};
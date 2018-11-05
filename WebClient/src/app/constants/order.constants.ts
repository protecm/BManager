export interface OrderStatus {
    code:number;
    description:string;
    styleClass:string;
    backgroundColor:string;
}

export class OrderConstants {
    /* Definition status  */
    public static readonly STATUS_NEW:OrderStatus = {
        code: 0,
        description: 'NEW',
        styleClass: 'status-new',
        backgroundColor: '#3bafda'
    };
    public static readonly STATUS_UPDATED:OrderStatus = {
        code: 1,
        description: 'UPDATED',
        styleClass: 'status-updated',
        backgroundColor: '#CCD1D9'
    };
    public static readonly STATUS_APPROVED:OrderStatus = {
        code: 2,
        description: 'APPROVED',
        styleClass: 'status-approved',
        backgroundColor: '#48CFAD'
    };
    public static readonly STATUS_IN_PROGRESS:OrderStatus = {
        code: 3,
        description: 'IN_PROGRESS',
        styleClass: 'status-in-progress',
        backgroundColor: '#FFCE54'
    };
    public static readonly STATUS_READY:OrderStatus = {
        code: 4,
        description: 'READY',
        styleClass: 'status-ready',
        backgroundColor: '#A0D468'
    };
    public static readonly STATUS_DELIVERIES:OrderStatus = {
        code: 5,
        description: 'DELIVERIES',
        styleClass: 'status-deliveries',
        backgroundColor: '#CCD1D9'
    };
    public static readonly STATUS_PACKING:OrderStatus = {
        code: 6,
        description: 'PACKING',
        styleClass: 'status-packing',
        backgroundColor: '#FFCE54'
    };
    public static readonly STATUS_PACKED:OrderStatus = {
        code: 7,
        description: 'PACKED',
        styleClass: 'status-packed',
        backgroundColor: '#A0D468'
    };
    public static readonly STATUS_SUPPLIED:OrderStatus = {
        code: 8,
        description: 'SUPPLIED',
        styleClass: 'status-supplied',
        backgroundColor: '#4FC1E9'
    };
    public static readonly STATUS_CANCELED:OrderStatus = {
        code: 9,
        description: 'CANCELED',
        styleClass: 'status-canceled',
        backgroundColor: '#d8bfbf'
    };

    /*  Monitoring (active) status  */
    public static readonly STATUS_ON_DELAY:OrderStatus = {
        code: 100,
        description: 'ON_DELAY',
        styleClass: 'status-on-delay',
        backgroundColor: '#FC6E51'
    };
    public static readonly STATUS_WAITING_APPROVE:OrderStatus = {
        code: 101,
        description: 'WAITING_APPROVE',
        styleClass: 'status-waiting-approve',
        backgroundColor: '#CCD1D9'
    };
    public static readonly STATUS_UNKNOWN:OrderStatus = {
        code: 404,
        description: 'UNKNOWN',
        styleClass: '',
        backgroundColor: ''
    };

    /*  The order of the code numbers is important, in this way we can query all active orders, code < 5 (supplied)  */
    public static readonly STATUS_LIST:OrderStatus[] = [
        OrderConstants.STATUS_NEW,
        OrderConstants.STATUS_UPDATED,
        OrderConstants.STATUS_APPROVED ,
        OrderConstants.STATUS_IN_PROGRESS ,
        OrderConstants.STATUS_READY ,
        OrderConstants.STATUS_DELIVERIES,
        OrderConstants.STATUS_PACKING,
        OrderConstants.STATUS_PACKED,
        OrderConstants.STATUS_SUPPLIED ,
        OrderConstants.STATUS_CANCELED
    ];

    public static GetStatus(code:number):OrderStatus {
        const len = OrderConstants.STATUS_LIST.length;
        for(let i=0; i<len; i++) {
            if(code === OrderConstants.STATUS_LIST[i].code) {
                return OrderConstants.STATUS_LIST[i];
            }
        }
        return OrderConstants.STATUS_UNKNOWN;
    }
}
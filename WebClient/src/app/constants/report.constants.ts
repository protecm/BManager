export interface ReportType {
    code:number;
    name:string;
}

export class ReportConstants {
    public static readonly TYPE_PRODUCTS:ReportType = {
        code: 0,
        name: 'PRODUCTS'
    };
    public static readonly TYPE_CUSTOMERS:ReportType = {
        code: 1,
        name: 'CUSTOMERS'
    };
    public static readonly TYPE_ORDERS:ReportType = {
        code: 2,
        name: 'ORDERS'
    };

    public static readonly TYPE_LIST:ReportType[] = [
        ReportConstants.TYPE_PRODUCTS,
        ReportConstants.TYPE_CUSTOMERS,
        ReportConstants.TYPE_ORDERS
    ];
}
export interface ReportOrdersGroupByInterface {
    id:number;
    description:string;
}

export class ReportOrdersGroupByConstants {
    public static readonly GROUP_BY_ORDERS:ReportOrdersGroupByInterface = {
      id: 1,
      description: 'ORDERS'
    };
    public static readonly GROUP_BY_PRODUCTS:ReportOrdersGroupByInterface = {
      id: 2,
      description: 'PRODUCTS'
    };

    public static readonly GROUP_BY_DEFAULT:ReportOrdersGroupByInterface = ReportOrdersGroupByConstants.GROUP_BY_ORDERS;

    public static readonly GROUP_BY_LIST:ReportOrdersGroupByInterface[] = [
        ReportOrdersGroupByConstants.GROUP_BY_ORDERS,
        ReportOrdersGroupByConstants.GROUP_BY_PRODUCTS
    ];
}
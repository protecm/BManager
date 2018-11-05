import {AlertHelper, AlertInterface} from "../helpers/alert.helper";

export class AlertConstants {
    public static readonly ALERT_ORDER_APPROVED:AlertInterface = {
        type: AlertHelper.TYPE_WARNING,
        msg: 'ORDER_APPROVED_ENABLE_TO_EDIT',
        isResolvable: true
    };
    public static readonly ALERT_ORDER_IN_DELIVERIES:AlertInterface = {
        type: AlertHelper.TYPE_SUCCESS,
        msg: 'ORDER_IN_DELIVERIES_EDIT_DISABLED',
        isResolvable: false
    };
    public static readonly ALERT_ORDER_SUPPLIED:AlertInterface = {
        type: AlertHelper.TYPE_SUCCESS,
        msg: 'ORDER_SUPPLIED_EDIT_DISABLED',
        isResolvable: false
    };
    public static readonly ALERT_ORDER_CANCELED:AlertInterface = {
        type: AlertHelper.TYPE_DANGER,
        msg: 'ORDER_CANCELED_EDIT_DISABLED',
        isResolvable: false
    };
    public static readonly ALERT_ORDER_VIEW_MODE:AlertInterface = {
        type: AlertHelper.TYPE_SUCCESS,
        msg: 'ORDER_VIEW_MODE',
        isResolvable: false
    };
}
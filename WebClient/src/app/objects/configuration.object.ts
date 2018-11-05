import {ConfigurationDtoInterface} from "../interfaces/configuration.dto.interface";

export class ConfigurationObject {

    public monitorActiveOrderHours:number;
    public monitorRefreshRateMinutes:number;
    public deliveriesRefreshRateMinutes:number;
    public commentsEnforcement:boolean;
    public chatMode:boolean;

    constructor(monitorActiveOrderHours:number, monitorRefreshRateMinutes:number,
                deliveriesRefreshRateMinutes:number, commentsEnforcement:boolean, chatMode:boolean){
        this.monitorActiveOrderHours = monitorActiveOrderHours;
        this.monitorRefreshRateMinutes = monitorRefreshRateMinutes;
        this.deliveriesRefreshRateMinutes = deliveriesRefreshRateMinutes;
        this.commentsEnforcement = commentsEnforcement;
        this.chatMode = chatMode;
    }

    public static FromDto(data:ConfigurationDtoInterface):ConfigurationObject {
        const monitorActiveOrderHours = parseInt(data.monitor_active_order_hours);
        const monitorRefreshRateMinutes = parseInt(data.monitor_refresh_rate_minutes);
        const deliveriesRefreshRateMinutes = parseInt(data.deliveries_refresh_rate_minutes);
        const commentsEnforcement = data.comments_enforcement === '1';
        const chatMode = data.chat_mode === '1';
        return new ConfigurationObject(monitorActiveOrderHours, monitorRefreshRateMinutes,
            deliveriesRefreshRateMinutes, commentsEnforcement, chatMode);
    }
}
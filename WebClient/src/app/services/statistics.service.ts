import {StatisticsObject} from "../objects/statistics.object";
import {CommunicationConstants} from "../constants/communication.constants";
import {DataBaseMessageInterface, ServerMessageInterface} from "../interfaces/server.message.interface";
import {CommunicationService} from "./communication.service";
import {ConfigurationService} from "./configuration.service";
import {DateHelper} from "../helpers/date.helper";
import {OrderFilterObject} from "../objects/order/order.filter.object";
import {NetworkServiceInterface} from "../interfaces/netwrok.service.interface";
import {CachedServiceInterface} from "../interfaces/cached.service.interface";

interface CachedStatisticsService {
    statistics:StatisticsObject;
}

export class StatisticsService implements NetworkServiceInterface<StatisticsObject,StatisticsObject>,
    CachedServiceInterface<CachedStatisticsService> {

    /*  CACHED-DATA  */
    public timestamp:number;
    public cacheData:CachedStatisticsService = <any>{};

    constructor(private communicationService:CommunicationService,
                private confService:ConfigurationService) {
    }

    public getStatistics():Promise<StatisticsObject> {
        const hoursInterval = this.confService.configurationData.monitorActiveOrderHours;
        const toDate = DateHelper.GetTodayDate(hoursInterval);
        return this.communicationService.sendRequest<StatisticsObject>(CommunicationConstants.GET_STATISTICS,
                            OrderFilterObject.GetStatisticsFilter(toDate))
            .then( (srvMsg:ServerMessageInterface<StatisticsObject>) => {
                this.timestamp = Date.now();
                this.cacheData.statistics = this.deserialize(srvMsg.dbMsg);
                return this.cacheData.statistics;
            });
    }

    public get cachedStatistics():StatisticsObject {
        return this.cacheData.statistics;
    }

    /* NetworkServiceInterface */
    convert(statisticsDto:StatisticsObject):StatisticsObject {
        if(statisticsDto) {
            let statisticsObj = new StatisticsObject(statisticsDto.general, statisticsDto.onDelay);
            return statisticsObj.deserialize();
        }
        return null;
    }
    deserialize(dbMsg:DataBaseMessageInterface<StatisticsObject>):StatisticsObject {
        return this.convert(dbMsg.data);
    }

    deserializeArray(dbMsg:DataBaseMessageInterface<StatisticsObject[]>):StatisticsObject[] {
        return [];
    }
}
import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";
import {AccessLevelConstants} from "../../constants/access.level.constants";

export interface UserAccessObjectInterface {
    accessHome:number;
    accessProducts:number;
    accessCustomers:number;
    accessOrders:number;
    accessMonitor:number;
    accessDeliveries:number;
    accessReports:number;
    accessSystem:number;
}

export class UserAccessObject implements UserAccessObjectInterface, NetworkObjectInterface<UserAccessObject,UserAccessObjectInterface>{

    private _accessHome:number;
    private _accessProducts:number;
    private _accessCustomers:number;
    private _accessOrders:number;
    private _accessMonitor:number;
    private _accessDeliveries:number;
    private _accessReports:number;
    private _accessSystem:number;

    constructor(accessHome:number, accessProducts:number, accessCustomers:number, accessOrders:number,
                accessMonitor:number, accessDeliveries:number, accessReports:number, accessSystem:number){
        this._accessHome = accessHome;
        this._accessProducts = accessProducts;
        this._accessCustomers = accessCustomers;
        this._accessOrders = accessOrders;
        this._accessMonitor = accessMonitor;
        this._accessDeliveries = accessDeliveries;
        this._accessReports = accessReports;
        this._accessSystem = accessSystem;
    }

    public get accessHome():number {
        return this._accessHome;
    }
    public get accessProducts():number {
        return this._accessProducts;
    }
    public get accessCustomers():number {
        return this._accessCustomers;
    }
    public get accessOrders():number {
        return this._accessOrders;
    }
    public get accessMonitor():number {
        return this._accessMonitor;
    }
    public get accessDeliveries():number {
        return this._accessDeliveries;
    }
    public get accessReports():number {
        return this._accessReports;
    }
    public get accessSystem():number {
        return this._accessSystem;
    }

    public static CreateInstance():UserAccessObject {
        //TODO - pass user role argument and create instance by role
        return new UserAccessObject(AccessLevelConstants.ACCESS_NONE, AccessLevelConstants.ACCESS_NONE,
            AccessLevelConstants.ACCESS_NONE, AccessLevelConstants.ACCESS_NONE, AccessLevelConstants.ACCESS_NONE,
            AccessLevelConstants.ACCESS_NONE, AccessLevelConstants.ACCESS_NONE, AccessLevelConstants.ACCESS_NONE);
    }

    /* NetworkObjectInterface */
    getObject():UserAccessObjectInterface {
        return {
            accessHome: this.accessHome,
            accessProducts: this.accessProducts,
            accessCustomers: this.accessCustomers,
            accessOrders: this.accessOrders,
            accessMonitor: this.accessMonitor,
            accessDeliveries: this.accessDeliveries,
            accessReports: this.accessReports,
            accessSystem: this.accessSystem
        };
    }

    serialize(base64:Base64Interface): string {
        const obj = this.getObject();
        let dataStr = JSON.stringify(obj);
        return base64.encode(dataStr);
    }

    deserialize():UserAccessObject {
        return this;
    }
}


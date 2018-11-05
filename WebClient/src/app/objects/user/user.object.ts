import {NetworkObjectInterface} from "../../interfaces/network.object.interface";
import {Base64Interface} from "../../interfaces/base64.interface";
import {UserAccessObject} from "./user.access.object";

export class UserObject implements NetworkObjectInterface<UserObject,Object>{

    private _id:number;
    private _username:string;
    private _password:string;
    public _userAccess:UserAccessObject;
    public isDeleted:boolean;

    constructor(id:number, username:string,password:string, userAccess:UserAccessObject, isDeleted:boolean) {
        this._id =id;
        this._username = username;
        this._password = password;
        this._userAccess = userAccess ? userAccess : UserAccessObject.CreateInstance();
        this.isDeleted = isDeleted;
    }

    public get id():number {
        return this._id;
    }

    public get username():string {
        return this._username;
    }

    public get password():string {
        return this._password;
    }

    public get userAccess():UserAccessObject {
        return this._userAccess;
    }
    /* NetworkObjectInterface */
    getObject():Object {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            userAccess: this.userAccess.getObject(),
            isDeleted: this.isDeleted
        };
    }

    serialize(base64:Base64Interface): string {
        const obj = this.getObject();
        let dataStr = JSON.stringify(obj);
        return base64.encode(dataStr);
    }

    deserialize():UserObject {
        this._userAccess = new UserAccessObject(this._userAccess.accessHome, this._userAccess.accessProducts,
            this._userAccess.accessCustomers, this._userAccess.accessOrders, this._userAccess.accessMonitor,
            this._userAccess.accessDeliveries, this._userAccess.accessReports, this._userAccess.accessSystem).deserialize();
        return this;
    }
}
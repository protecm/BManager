import {IIntervalService} from "angular";

interface CallbackServiceInterface {
    listeners:Object;
    registerListener(ind:number,callback:Function):boolean;
    registerTickListener(ind:number,callback:Function,tickInterval:number): boolean;
    stopTickListener(ind:number): void;
    callListener(ind:number):void;
}

export abstract class CallbackService implements CallbackServiceInterface {
    public listeners = {};
    private tickPromise = {};

    private static readonly MAX_LISTENERS = 100;

    constructor(protected $interval:IIntervalService) {
    }

    public getUnusedID():number {
        let id = null;

        for(let i=1; i<CallbackService.MAX_LISTENERS; i++) {
            if(!this.listeners[i]) {
                id = i;
                break;
            }
        }

        return id;
    }

    public registerListener(ind:number,callback:Function):boolean {
        this.listeners[ind] = callback;
        return true;
    }

    public registerTickListener(ind:number,callback:Function,tickInterval:number): boolean {
        this.registerListener(ind,callback);
        this.tickPromise[ind] = this.$interval(callback,tickInterval,0);
        return true;
    }

    public stopTickListener(ind:number): void {
        if(this.tickPromise[ind]) {
            this.$interval.cancel(this.tickPromise[ind]);
            this.tickPromise[ind] = null;
            this.removeListener(ind);
        }
    }

    public callListener(ind:number):void {
        if( this.listeners && this.listeners[ind] ) {
            this.listeners[ind]();
        }
    }

    public removeListener(ind:number):void {
        if( this.listeners && this.listeners[ind] ) {
            this.listeners[ind] = null;
        }
    }
}

interface CallbackTriggerComponentInterface {
    trigger(callbackService:CallbackServiceInterface, ind:number):void;
}

export abstract class CallbackTriggerComponent implements CallbackTriggerComponentInterface{

    constructor(){
    }

    public trigger(callbackService: CallbackServiceInterface, ind: number): void {
        callbackService.callListener(ind);
    }
}
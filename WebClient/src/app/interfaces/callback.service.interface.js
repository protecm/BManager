"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CallbackService = /** @class */ (function () {
    function CallbackService($interval) {
        this.$interval = $interval;
        this.listeners = {};
        this.tickPromise = {};
    }
    CallbackService.prototype.getUnusedID = function () {
        var id = null;
        for (var i = 1; i < CallbackService.MAX_LISTENERS; i++) {
            if (!this.listeners[i]) {
                id = i;
                break;
            }
        }
        return id;
    };
    CallbackService.prototype.registerListener = function (ind, callback) {
        this.listeners[ind] = callback;
        return true;
    };
    CallbackService.prototype.registerTickListener = function (ind, callback, tickInterval) {
        this.registerListener(ind, callback);
        this.tickPromise[ind] = this.$interval(callback, tickInterval, 0);
        return true;
    };
    CallbackService.prototype.stopTickListener = function (ind) {
        if (this.tickPromise[ind]) {
            this.$interval.cancel(this.tickPromise[ind]);
            this.tickPromise[ind] = null;
            this.removeListener(ind);
        }
    };
    CallbackService.prototype.callListener = function (ind) {
        if (this.listeners && this.listeners[ind]) {
            this.listeners[ind]();
        }
    };
    CallbackService.prototype.removeListener = function (ind) {
        if (this.listeners && this.listeners[ind]) {
            this.listeners[ind] = null;
        }
    };
    CallbackService.MAX_LISTENERS = 100;
    return CallbackService;
}());
exports.CallbackService = CallbackService;
var CallbackTriggerComponent = /** @class */ (function () {
    function CallbackTriggerComponent() {
    }
    CallbackTriggerComponent.prototype.trigger = function (callbackService, ind) {
        callbackService.callListener(ind);
    };
    return CallbackTriggerComponent;
}());
exports.CallbackTriggerComponent = CallbackTriggerComponent;
//# sourceMappingURL=callback.service.interface.js.map
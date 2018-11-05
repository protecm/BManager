"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var callback_service_interface_1 = require("../../interfaces/callback.service.interface");
var MonitorComponent = /** @class */ (function (_super) {
    __extends(MonitorComponent, _super);
    function MonitorComponent(monitorService) {
        var _this = _super.call(this) || this;
        _this.monitorService = monitorService;
        return _this;
    }
    MonitorComponent.prototype.tabSelected = function (ind) {
        this.trigger(this.monitorService, ind);
    };
    return MonitorComponent;
}(callback_service_interface_1.CallbackTriggerComponent));
exports.monitorComponent = {
    controller: MonitorComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/monitor.template.html'
};
//# sourceMappingURL=monitor.component.js.map
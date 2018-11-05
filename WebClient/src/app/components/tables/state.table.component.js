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
var base_table_component_1 = require("./base.table.component");
var StateTableComponent = /** @class */ (function (_super) {
    __extends(StateTableComponent, _super);
    function StateTableComponent() {
        var _this = _super.call(this) || this;
        _this.defaultState = 'Definition';
        return _this;
    }
    Object.defineProperty(StateTableComponent.prototype, "state", {
        get: function () {
            return this._state ? this._state : this.defaultState;
        },
        set: function (value) {
            this._state = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateTableComponent.prototype, "isStateDefinition", {
        get: function () {
            return this.state === 'Definition';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateTableComponent.prototype, "isStateMonitoring", {
        get: function () {
            return this.state === 'Monitoring';
        },
        enumerable: true,
        configurable: true
    });
    return StateTableComponent;
}(base_table_component_1.BaseTableComponent));
exports.StateTableComponent = StateTableComponent;
var StateTableComponentOptions = /** @class */ (function (_super) {
    __extends(StateTableComponentOptions, _super);
    function StateTableComponentOptions(controller, templateUrl) {
        var _this = _super.call(this, controller, templateUrl) || this;
        _this.bindings.state = '<';
        return _this;
    }
    return StateTableComponentOptions;
}(base_table_component_1.BaseTableComponentOptions));
exports.StateTableComponentOptions = StateTableComponentOptions;
//# sourceMappingURL=state.table.component.js.map
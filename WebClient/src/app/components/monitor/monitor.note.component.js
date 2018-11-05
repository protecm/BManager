"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MonitorNoteComponent = /** @class */ (function () {
    function MonitorNoteComponent(confService) {
        this.confService = confService;
    }
    MonitorNoteComponent.prototype.$onInit = function () {
    };
    Object.defineProperty(MonitorNoteComponent.prototype, "isWaitingResolve", {
        get: function () {
            return this.confService.configurationData.commentsEnforcement && !this.note.isReallyResolved;
        },
        enumerable: true,
        configurable: true
    });
    MonitorNoteComponent.prototype.resolve = function () {
        var _this = this;
        if (this.onResolve) {
            this.isResolveInProgress = true;
            this.onResolve().then(function (result) {
                _this.isResolveInProgress = false;
            });
        }
    };
    return MonitorNoteComponent;
}());
exports.monitorNoteComponent = {
    controller: MonitorNoteComponent,
    controllerAs: 'vm',
    bindings: {
        note: '<',
        onResolve: '&?'
    },
    template: "<div ng-if=\"vm.note.note\">\n                    <span>\n                        {{ vm.note.note }}\n                    </span>\n                    <button type=\"button\" class=\"btn btn-success btn-xs\" ng-click=\"vm.resolve();$event.stopPropagation();\"\n                        ng-if=\"vm.isWaitingResolve\" ladda=\"vm.isResolveInProgress\" \n                        data-style=\"expand-left\" data-size=\"xs\" data-spinner-size=\"25\">\n                            <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\">\n                            </span>\n                    </button>\n                </div>"
};
//# sourceMappingURL=monitor.note.component.js.map
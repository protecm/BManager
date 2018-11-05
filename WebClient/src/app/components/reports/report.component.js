"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReportComponent = /** @class */ (function () {
    function ReportComponent() {
    }
    Object.defineProperty(ReportComponent.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        set: function (value) {
            this._isVisible = value;
            if (this._reportFormCtrl) {
                this._reportFormCtrl.isVisible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportComponent.prototype, "isBodyVisible", {
        get: function () {
            return this.isVisible && this._reportResultCtrl && this._reportResultCtrl.isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportComponent.prototype, "reportFormCtrl", {
        get: function () {
            return this._reportFormCtrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportComponent.prototype, "reportResultCtrl", {
        get: function () {
            return this._reportResultCtrl;
        },
        enumerable: true,
        configurable: true
    });
    ReportComponent.prototype.registerFormCtrl = function (ctrl) {
        this._reportFormCtrl = ctrl;
        if (this.parent && this._reportFormCtrl) {
            this.parent.registerReport(this._reportFormCtrl.type, this);
        }
    };
    ReportComponent.prototype.registerResultCtrl = function (ctrl) {
        this._reportResultCtrl = ctrl;
    };
    ReportComponent.prototype.generate = function () {
        var _this = this;
        if (this._reportFormCtrl) {
            this._reportFormCtrl.generate()
                .then(function (data) {
                if (_this.reportResultCtrl && (_this.reportFormCtrl.type.code === _this.reportResultCtrl.type.code)) {
                    _this.reportResultCtrl.onDataChange(data);
                }
            });
        }
    };
    ReportComponent.prototype.print = function () {
        if (this._reportResultCtrl) {
            this._reportResultCtrl.print();
        }
    };
    ReportComponent.prototype.$onInit = function () {
    };
    ReportComponent.prototype.$postLink = function () {
    };
    ReportComponent.prototype.$onDestroy = function () {
    };
    return ReportComponent;
}());
exports.reportComponent = {
    controller: ReportComponent,
    controllerAs: 'vm',
    require: {
        parent: '^reportsHost'
    },
    transclude: {
        form: 'reportForm',
        body: '?reportBody'
    },
    template: "<div ng-show=\"vm.isVisible\">\n                   <div ng-transclude=\"form\">\n                   </div>\n                   <div class=\"col-sm-12\">\n                        <div class=\"form-group row\">\n                            <button class=\"btn btn-primary btn-block\" type=\"button\" ng-click=\"vm.generate()\" ladda=\"vm.isGenerateInProcess\" \n                                    data-style=\"expand-left\" data-spinner-size=\"25\">\n                                {{ 'GENERATE_REPORT' | translate}}\n                            </button>\n                        </div>\n                   </div>\n               </div>\n               <div ng-show=\"vm.isBodyVisible\">\n                   <div ng-transclude=\"body\">\n                   </div>\n                   <ng-transclude>\n                   </ng-transclude>      \n               </div>"
};
//# sourceMappingURL=report.component.js.map
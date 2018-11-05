"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ToastService = /** @class */ (function () {
    function ToastService(toastr, $translate) {
        this.toastr = toastr;
        this.$translate = $translate;
    }
    ToastService.prototype.showSuccess = function (msg, title) {
        msg = this.$translate.instant(msg);
        title = this.$translate.instant(title);
        this.toastr.success(msg, title);
    };
    ToastService.prototype.showError = function (msg, title) {
        msg = this.$translate.instant(msg);
        title = this.$translate.instant(title);
        this.toastr.error(msg, title);
    };
    return ToastService;
}());
exports.ToastService = ToastService;
//# sourceMappingURL=toast.service.js.map
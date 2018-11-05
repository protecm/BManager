"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderNoteObject = /** @class */ (function () {
    function OrderNoteObject(note, isResolved) {
        if (isResolved === void 0) { isResolved = false; }
        this.note = note;
        this.isResolved = isResolved;
    }
    Object.defineProperty(OrderNoteObject.prototype, "isReallyResolved", {
        get: function () {
            return this.note ? this.isResolved : true;
        },
        enumerable: true,
        configurable: true
    });
    return OrderNoteObject;
}());
exports.OrderNoteObject = OrderNoteObject;
//# sourceMappingURL=order.note.object.js.map
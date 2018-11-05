"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CompareStatus;
(function (CompareStatus) {
    CompareStatus[CompareStatus["EQUAL"] = 0] = "EQUAL";
    CompareStatus[CompareStatus["UPDATED"] = 1] = "UPDATED";
    CompareStatus[CompareStatus["REMOVED"] = 2] = "REMOVED";
    CompareStatus[CompareStatus["NEW"] = 3] = "NEW";
})(CompareStatus = exports.CompareStatus || (exports.CompareStatus = {}));
var OrderComparatorObject = /** @class */ (function () {
    function OrderComparatorObject(orderSource, orderTarget, lodash) {
        this.orderSource = orderSource; //OLD
        this.orderTarget = orderTarget; //NEW
        this.lodash = lodash;
        this.sourceResults = [];
        this.targetResults = [];
    }
    OrderComparatorObject.prototype.compare = function () {
        this.customer = this.orderSource.customer.isEqual(this.orderTarget.customer) ?
            OrderComparatorObject.RESULT_EQUAL : OrderComparatorObject.RESULT_UPDATED;
        this.supplyDate = this.orderSource.supplyDate.getTime() === this.orderTarget.supplyDate.getTime() ?
            OrderComparatorObject.RESULT_EQUAL : OrderComparatorObject.RESULT_UPDATED;
        this.notes = this.orderSource.notes.note === this.orderTarget.notes.note ?
            OrderComparatorObject.RESULT_EQUAL : OrderComparatorObject.RESULT_UPDATED;
        this.compareOrderRows();
        return this;
    };
    OrderComparatorObject.prototype.compareOrderRows = function () {
        var rowsSource_c = this.lodash.cloneDeep(this.orderSource.orderRows);
        var rowsTarget_c = this.lodash.cloneDeep(this.orderTarget.orderRows);
        var _loop_1 = function () {
            var rowTarget = rowsTarget_c[0];
            rowsTarget_c.splice(0, 1);
            var indexSource = this_1.lodash.findIndex(rowsSource_c, function (row) {
                return rowTarget.product.id === row.product.id;
            });
            if (indexSource === -1) {
                this_1.targetResults.push(this_1.getCompareObject(null, rowTarget, OrderComparatorObject.RESULT_NEW));
                return "continue";
            }
            var rowSource = rowsSource_c[indexSource];
            rowsSource_c.splice(indexSource, 1);
            var compareRes = this_1.getCompareObject(rowSource, rowTarget);
            this_1.targetResults.push(compareRes);
            this_1.sourceResults.push(compareRes);
        };
        var this_1 = this;
        while (rowsTarget_c.length > 0) {
            _loop_1();
        }
        while (rowsSource_c.length > 0) {
            var rowSource = rowsSource_c[0];
            rowsSource_c.splice(0, 1);
            this.sourceResults.push(this.getCompareObject(rowSource, null, OrderComparatorObject.RESULT_REMOVED));
        }
    };
    OrderComparatorObject.prototype.getCompareObject = function (rowSource, rowTarget, result) {
        return {
            source: rowSource,
            target: rowTarget,
            result: result ? result : this.compareOrderRow(rowSource, rowTarget)
        };
    };
    OrderComparatorObject.prototype.compareOrderRow = function (rowSource, rowTarget) {
        if (!rowSource)
            return OrderComparatorObject.RESULT_NEW;
        if (!rowTarget)
            return OrderComparatorObject.RESULT_REMOVED;
        if (rowSource.product.id !== rowTarget.product.id)
            return OrderComparatorObject.RESULT_NEW;
        if (rowSource.amount !== rowTarget.amount)
            return OrderComparatorObject.RESULT_UPDATED;
        if (rowSource.notes.note !== rowTarget.notes.note)
            return OrderComparatorObject.RESULT_UPDATED;
        return OrderComparatorObject.RESULT_EQUAL;
    };
    OrderComparatorObject.RESULT_EQUAL = {
        status: CompareStatus.EQUAL,
        type: 'primary'
    };
    OrderComparatorObject.RESULT_UPDATED = {
        status: CompareStatus.UPDATED,
        type: 'row-updated'
    };
    OrderComparatorObject.RESULT_REMOVED = {
        status: CompareStatus.REMOVED,
        type: 'row-removed'
    };
    OrderComparatorObject.RESULT_NEW = {
        status: CompareStatus.NEW,
        type: 'row-added'
    };
    return OrderComparatorObject;
}());
exports.OrderComparatorObject = OrderComparatorObject;
//# sourceMappingURL=order.comparator.object.js.map
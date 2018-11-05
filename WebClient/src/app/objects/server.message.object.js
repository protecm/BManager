"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerMessageObject = /** @class */ (function () {
    function ServerMessageObject(code, msg, extraInfo, data, dbMsg) {
        if (msg === void 0) { msg = ''; }
        if (extraInfo === void 0) { extraInfo = ''; }
        if (data === void 0) { data = {}; }
        if (dbMsg === void 0) { dbMsg = {}; }
        this.code = code;
        this.msg = msg;
        this.extraInfo = extraInfo;
        this.data = data;
        this.dbMsg = dbMsg;
    }
    return ServerMessageObject;
}());
exports.ServerMessageObject = ServerMessageObject;
//# sourceMappingURL=server.message.object.js.map
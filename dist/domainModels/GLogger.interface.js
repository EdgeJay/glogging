"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingMode = void 0;
/**
 * LOCAL - defaults to have transport for logging in console, default logs up to debug
 * DEV - defaults to have transport for logging in console, default logs up to info
 * PRODUCTION - defaults to have no transport, default logs up to info
 */
var LoggingMode;
(function (LoggingMode) {
    LoggingMode["LOCAL"] = "LOCAL";
    LoggingMode["DEV"] = "DEV";
    LoggingMode["PRODUCTION"] = "PRODUCTION";
})(LoggingMode = exports.LoggingMode || (exports.LoggingMode = {}));
//# sourceMappingURL=GLogger.interface.js.map
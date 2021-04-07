"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLogger = void 0;
var is_secret_1 = __importDefault(require("is-secret"));
var winston_1 = __importStar(require("winston"));
var GLogger_interface_1 = require("./domainModels/GLogger.interface");
var core_1 = require("@js-joda/core");
var ObjUtils_1 = require("./utils/ObjUtils");
var DEFAULT_CONFIG = { loggingMode: GLogger_interface_1.LoggingMode.PRODUCTION };
/**
 * How to use this class:
 * Initialize a new instance in your codebase. Use this instance as a singleton through the codebase.
 * if loggingMode is not provided, defaults to LoggingMode.PRODUCTION
 */
var GLogger = /** @class */ (function () {
    function GLogger(inputConfigs) {
        this.verboseMode = false;
        this.loggingMode = GLogger_interface_1.LoggingMode.PRODUCTION;
        var configs = __assign(__assign({}, DEFAULT_CONFIG), inputConfigs);
        this.loggingMode = configs.loggingMode;
        switch (this.loggingMode) {
            case GLogger_interface_1.LoggingMode.LOCAL:
                this.logger = winston_1.default.createLogger({
                    level: 'debug',
                    format: winston_1.format.combine(formatTimestamp(), sensitiveDataRedacter)
                });
                this.logger.add(new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.printf(consoleMessageFormatter))
                }));
                break;
            case GLogger_interface_1.LoggingMode.DEV:
                this.logger = winston_1.default.createLogger({
                    level: 'info',
                    format: winston_1.format.combine(formatTimestamp(), sensitiveDataRedacter)
                });
                this.logger.add(new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.printf(consoleMessageFormatter))
                }));
                break;
            case GLogger_interface_1.LoggingMode.PRODUCTION:
            default:
                this.logger = winston_1.default.createLogger({
                    level: 'info',
                    format: winston_1.format.combine(formatTimestamp(), sensitiveDataRedacter)
                });
        }
    }
    GLogger.prototype.toggleVerboseModeOn = function () {
        this.verboseMode = true;
    };
    /**
     * Add a winston transport to this LogUtil instance
     * @param transport a winston-transport Log Transport instance
     */
    GLogger.prototype.addLogTransport = function (transport) {
        this.logger.add(transport);
        return this;
    };
    /**
     * Creates a log object of level debug
     * @example
     * info('msg', {mydata: "data"})
     * // creates the following log object
     * {message: 'msg', level: 'debug', mydata: 'data'}
     * @param data any additional relevant data, as a javascript object.
     * If it contains a `message` property, the string is appended
     * If it contains a `level` property, that is ignored
     */
    GLogger.prototype.debug = function (message, data) {
        /*
        if (this.verboseMode) {
          logVerbose('debug', message, data);
        }
        this.logger.debug(message, data);
        */
        return this;
    };
    /**
     * Creates a log object of level info
     * @example
     * info('msg', {mydata: "data"})
     * // creates the following log object
     * {message: 'msg', level: 'info', mydata: 'data'}
     * @param data any additional relevant data, as a javascript object.
     * If it contains a `message` property, the string is appended
     * If it contains a `level` property, that is ignored
     */
    GLogger.prototype.info = function (message, data) {
        /*
        if (this.verboseMode) {
          logVerbose('info', message, data);
        }
        this.logger.info(message, data);
        */
        return this;
    };
    /**
     * Creates a log object of level warn
     * @example
     * warn('msg', new Error('error msg'), {mydata: "data"})
     * // creates the following log object
     * {message: 'msg', level: 'warn', mydata: 'data', additionalInfo: {error: {stack: 'errorstack!',message:'error msg',name:'Error'}}}
     * @param data any additional relevant data, as a javascript object.
     * If it contains a `message` property, the string is appended
     * If it contains a `level` property, that is ignored
     */
    GLogger.prototype.warn = function (message, error, data) {
        if (this.verboseMode) {
            logVerbose('warn', message, data, error);
        }
        var dataToLog = data ? __assign({}, data) : {};
        if (error) {
            dataToLog.additionalInfo = __assign(__assign({}, dataToLog.additionalInfo), { error: { stack: error.stack, message: error.message, name: error.name } });
        }
        this.logger.warn(message, dataToLog);
        return this;
    };
    /**
     * Creates a log object of level error
     * @example
     * error('msg', new Error('error msg'), {mydata: "data"})
     * // creates the following log object
     * {message: 'msg', level: 'error', mydata: 'data', additionalInfo: {error: {stack: 'errorstack!',message:'error msg',name:'Error'}}}
     * @param data any additional relevant data, as a javascript object.
     * If it contains a `message` property, the string is appended
     * If it contains a `level` property, that is ignored
     */
    GLogger.prototype.error = function (message, error, data) {
        if (this.verboseMode) {
            logVerbose('error', message, data, error);
        }
        var dataToLog = data ? __assign({}, data) : {};
        if (error) {
            dataToLog.additionalInfo = __assign(__assign({}, dataToLog.additionalInfo), { error: { stack: error.stack, message: error.message, name: error.name } });
        }
        this.logger.error(message, dataToLog);
        return this;
    };
    return GLogger;
}());
exports.GLogger = GLogger;
/**
 * Formatter for console logging in GLogging
 * Depending on whether trxCategory is passed in, either logs out basicLog or enrichedLog
 * @param info
 */
function consoleMessageFormatter(info) {
    var _a = info, level = _a.level, message = _a.message, timestamp = _a.timestamp, additionalInfo = _a.additionalInfo, filename = _a.filename, data = __rest(_a, ["level", "message", "timestamp", "additionalInfo", "filename"]);
    var logString = "[" + timestamp + "][" + level.toUpperCase() + "]";
    var trxCategory = data.trxCategory, trxId = data.trxId, trxModule = data.trxModule, trxName = data.trxName, trxStatus = data.trxStatus, timeTakenInMillis = data.timeTakenInMillis, userToken = data.userToken;
    if (!trxCategory) {
        var basicLog = logString
            .concat("[" + message + "]")
            .concat("[" + (data ? formatWithLinebreakAndIndent(data) : 'no data') + "]\n")
            .concat("[" + (additionalInfo ? formatWithLinebreakAndIndent(additionalInfo) : 'no additionalInfo') + "]\n");
        return basicLog;
    }
    var enrichedLog = logString
        .concat("[" + trxCategory + "][" + trxModule + "][" + trxId + "][" + trxName + "][" + trxStatus + "][" + ((timeTakenInMillis === null || timeTakenInMillis === void 0 ? void 0 : timeTakenInMillis.toString()) || 'time taken is not tracked') + "ms]")
        .concat("[" + message + "]\n")
        .concat("[" + (userToken ? formatWithLinebreakAndIndent(userToken) : 'no user token') + "]\n")
        .concat("[" + (additionalInfo ? formatWithLinebreakAndIndent(additionalInfo) : 'no additionalInfo') + "]\n");
    return filename ? enrichedLog.concat("[" + filename + "]") : enrichedLog;
}
var formatTimestamp = winston_1.default.format(function (info) {
    info.timestamp = core_1.ZonedDateTime.now().format(core_1.DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    return info;
});
function formatWithLinebreakAndIndent(obj) {
    var _a;
    return (_a = JSON.stringify(obj, null, 4)) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n');
}
function logVerbose(level, message, data, error) {
    console.log("[GLogger] " + level + "() received message: " + message);
    if (data) {
        console.log("[GLogger] " + level + "() received data: " + formatWithLinebreakAndIndent(data));
    }
    if (error) {
        console.log("[GLogger] " + level + "() received error: " + error.toString());
    }
}
var sensitiveDataRedacter = winston_1.default.format(function (info) {
    ObjUtils_1.traverseObject(info, redactSensitiveValue);
    return info;
})();
/**
 * redacts all sensitive values
 * @param key property key of the object
 * @param value value of the object's property
 */
function redactSensitiveValue(key, value) {
    if (typeof value !== 'string') {
        return value;
    }
    var nricRegex = /[a-zA-Z]\d{7}[a-zA-Z]/i;
    // const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (typeof value === 'string' && nricRegex.test(value)) {
        return '*****' + value.substring(5);
    }
    if (is_secret_1.default.key(key) || is_secret_1.default.value(value)) {
        return '[REDACTED]';
    }
    return value;
}
//# sourceMappingURL=GLogger.js.map
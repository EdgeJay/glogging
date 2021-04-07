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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedFunction = exports.LoggedMethod = exports.LoggedClass = void 0;
var GLogger_auditLogger_1 = require("./GLogger.auditLogger");
var ObjUtils_1 = require("./utils/ObjUtils");
var DEFAULT_OPTIONS = {
    toLogResults: false
};
/**
 * #### Class decorator function that adds logging to all class methods
 * - All class methods _must_ take in an IExpressRequest object (extended from express.Request) as first parameter
 * - Creates success audit log of level `info` on return
 * - Creates fail audit log of level `warn` on error thrown
 * - Modifies all class methods except the constructor method
 * - Arrow functions are _not_ considered class methods
 * @param logger a GLogger instance
 * @param metadata metadata including transaction category, transaction module, & optional filename
 * @param options Optional option parameter
 * - toLogResult - whether to log the return value of the decorated function. Defaults to false.
 * - redactedProperties(optional) - if `toLogResult` set to true, use this array for properties you don't want logged out.
 * @example result = [{key1: 'a',key2: 'b'}, {key1: 'c',key2: 'd'}]; redactedProperties = ['key1', 0]; loggedResult = [{key2: 'd'}]
 */
function LoggedClass(logger, metadata, options) {
    return function (target) {
        for (var _i = 0, _a = Reflect.ownKeys(target.prototype); _i < _a.length; _i++) {
            var propertyName = _a[_i];
            var descriptor = Reflect.getOwnPropertyDescriptor(target.prototype, propertyName);
            var isMethod = (descriptor === null || descriptor === void 0 ? void 0 : descriptor.value) instanceof Function;
            if (!isMethod || propertyName === 'constructor') {
                continue;
            }
            if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.value) === 'function') {
                Object.defineProperty(target.prototype, propertyName, LoggedMethod(logger, metadata, options)(target, propertyName, descriptor));
            }
            // Object.defineProperty(target.prototype, propertyName, descriptor);
        }
    };
}
exports.LoggedClass = LoggedClass;
/**
 * #### Method decorator function that adds logging to method
 * - Methods _must_ take in an IExpressRequest object (extended from express.Request) as first parameter
 * - Creates success audit log of level `info` on return
 * - Creates fail audit log of level `warn` on error thrown
 * - Modifies all class methods except the constructor method
 * - Arrow functions are _not_ considered class methods
 * @param logger a GLogger instance
 * @param metadata metadata including transaction category, transaction module, & optional filename
 * @param options Optional option parameter
 * - toLogResult - whether to log the return value of the decorated function. Defaults to false.
 * - redactedProperties(optional) - if `toLogResult` set to true, use this array for properties you don't want logged out.
 * @example result = [{key1: 'a',key2: 'b'}, {key1: 'c',key2: 'd'}]; redactedProperties = ['key1', 0]; loggedResult = [{key2: 'd'}]
 */
function LoggedMethod(logger, metadata, options) {
    return function LoggedWrapperMethod(target, key, descriptor) {
        var originalMethod = descriptor.value;
        if (typeof originalMethod !== 'function') {
            throw new TypeError("@LoggedMethod decorator can only be applied to methods not: " + typeof originalMethod);
        }
        return {
            configurable: false,
            get: function () {
                var _this = this;
                if (this === target.prototype) {
                    return originalMethod;
                }
                descriptor.value = function (req) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return decorateFunctionWithLogs.apply(void 0, __spreadArrays([logger, metadata, originalMethod.bind(_this), key, req, options], args));
                };
                var boundFn = descriptor.value;
                return boundFn;
            },
            set: function (value) {
                descriptor.value = value;
            }
        };
    };
}
exports.LoggedMethod = LoggedMethod;
/**
 * #### decorator function that adds logging to a normal function / arrow function
 * - Function must take in an IExpressRequest object (extended from express.Request) as first parameter
 * - Creates success audit log of level `info` on return
 * - Creates fail audit log of level `warn` on error thrown
 * @param logger a GLogger instance
 * @param metadata metadata including transaction category, transaction module, & optional filename
 * @param options Optional option parameter
 * - toLogResult - whether to log the return value of the decorated function. Defaults to false.
 * - redactedProperties(optional) - if `toLogResult` set to true, use this array for properties you don't want logged out.
 * @example result = [{key1: 'a',key2: 'b'}, {key1: 'c',key2: 'd'}]; redactedProperties = ['key1', 0]; loggedResult = [{key2: 'd'}]
 */
function LoggedFunction(logger, metadata, options) {
    return function (decoratedFunc, req) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return decorateFunctionWithLogs.apply(void 0, __spreadArrays([logger, metadata, decoratedFunc, decoratedFunc.name, req, options], args));
    };
}
exports.LoggedFunction = LoggedFunction;
function decorateFunctionWithLogs(logger, _a, decoratedFunc, decoratedFuncName, req, options) {
    var trxCategory = _a.trxCategory, trxModule = _a.trxModule, filename = _a.filename;
    var args = [];
    for (var _i = 6; _i < arguments.length; _i++) {
        args[_i - 6] = arguments[_i];
    }
    var startTime = new Date().getTime();
    var fnName = String(decoratedFuncName);
    var auditLoggerInstance = new GLogger_auditLogger_1.GLoggerAuditLogger(logger);
    var logFailure = auditLoggerInstance.logTransactionFailure.bind(auditLoggerInstance, { req: req }, { trxCategory: trxCategory, filename: filename, trxName: fnName, trxModule: trxModule }, startTime);
    try {
        var promiseOrValue = decoratedFunc.apply(void 0, __spreadArrays([req], args));
        var opt_1 = __assign(__assign({}, DEFAULT_OPTIONS), options);
        var logSuccess_1 = auditLoggerInstance.logTransactionSuccess.bind(auditLoggerInstance, "Transaction: " + fnName + " success", { req: req }, { trxCategory: trxCategory, filename: filename, trxName: fnName, trxModule: trxModule }, startTime);
        var redact_1 = ObjUtils_1.redactProperties.bind(null, opt_1.redactedProperties);
        // Scenario where decoratedFunc is asynchronous returning Promise
        if (promiseOrValue instanceof Promise) {
            return promiseOrValue
                .then(function (result) {
                if (opt_1.toLogResults) {
                    opt_1.redactedProperties && result ? logSuccess_1(redact_1(result)) : logSuccess_1(result);
                }
                else {
                    logSuccess_1();
                }
                return result;
            })
                .catch(function (e) {
                logFailure(e);
                throw e;
            });
        }
        // Scenario where decoratedFunc is synchronous returning value
        // Why separate? if we `await` sync decoratedFunc, return value gets casted into Promise, becoming async
        if (opt_1.toLogResults) {
            opt_1.redactedProperties && promiseOrValue ? logSuccess_1(redact_1(promiseOrValue)) : logSuccess_1(promiseOrValue);
        }
        else {
            logSuccess_1();
        }
        return promiseOrValue;
    }
    catch (e) {
        logFailure(e);
        throw e;
    }
}
//# sourceMappingURL=GLogger.decorator.js.map
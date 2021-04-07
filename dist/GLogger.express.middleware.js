"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSuccessLoggerFactory = exports.responseErrorLoggerFactory = exports.enhanceReqWithTransactionAndTime = void 0;
var uuid_1 = require("uuid");
var GLogger_auditLogger_1 = require("./GLogger.auditLogger");
/**
 * Middleware which enhances the request with two properties:
 * reqStartTimeInEpochMillis & uuid
 * These properties are consumed in logger later
 * @param req
 * @param res
 * @param next
 */
function enhanceReqWithTransactionAndTime(req, _, next) {
    try {
        req.reqStartTimeInEpochMillis = new Date().getTime();
        if (!req.uuid) {
            req.uuid = uuid_1.v4();
        }
        next();
    }
    catch (e) {
        next(e);
    }
}
exports.enhanceReqWithTransactionAndTime = enhanceReqWithTransactionAndTime;
/**
 * Factory to create an error logger express middleware.
 * Assumes that req.user has been set to a JWT object. See IJwtPayload interface
 * @param logger A GLogger instance
 * @param trxModule the transaction module e.g. DWP
 * @param trxName the transaction name e.g. HRP
 * @param filename the filename. In Node.js can use __filename (if not webpacked)
 * @param passErrorToNext whether to pass the error to the next middleware function. Defaults to false. If set to false, this should be the last middleware
 */
function responseErrorLoggerFactory(logger, trxModule, trxName, filename, passErrorToNext) {
    if (passErrorToNext === void 0) { passErrorToNext = false; }
    return function (err, req, res, next) {
        try {
            var auditLoggerInstance = new GLogger_auditLogger_1.GLoggerAuditLogger(logger);
            auditLoggerInstance.logHttpFailure(err, { req: req, res: res }, { filename: filename, trxModule: trxModule, trxName: trxName });
            if (passErrorToNext) {
                next(err);
            }
            else {
                next();
            }
        }
        catch (e) {
            next(e);
        }
    };
}
exports.responseErrorLoggerFactory = responseErrorLoggerFactory;
/**
 * Factory to create a success logger express middleware.
 * Assumes that req.user has been set to a JWT object. See IJwtPayload interface
 * @param logger A GLogger instance
 * @param trxModule the transaction module e.g. DWP
 * @param trxName the transaction name e.g. HRP
 * @param filename the filename. In Node.js can use __filename (if not webpacked)
 */
function responseSuccessLoggerFactory(logger, trxModule, trxName, filename) {
    return function (req, res, next) {
        try {
            res.on('finish', function () {
                if (res.statusCode < 400) {
                    var auditLoggerInstance = new GLogger_auditLogger_1.GLoggerAuditLogger(logger);
                    auditLoggerInstance.logHttpSuccess('HTTP Call Success', { req: req, res: res }, { filename: filename, trxModule: trxModule, trxName: trxName });
                }
            });
            next();
        }
        catch (e) {
            next(e);
        }
    };
}
exports.responseSuccessLoggerFactory = responseSuccessLoggerFactory;
//# sourceMappingURL=GLogger.express.middleware.js.map
import express from 'express';
import { IExpressRequest, IExpressResponse } from './domainModels';
import { GLogger } from './GLogger';
/**
 * Middleware which enhances the request with two properties:
 * reqStartTimeInEpochMillis & uuid
 * These properties are consumed in logger later
 * @param req
 * @param res
 * @param next
 */
export declare function enhanceReqWithTransactionAndTime(req: IExpressRequest, _: IExpressResponse, next: express.NextFunction): void;
/**
 * Factory to create an error logger express middleware.
 * Assumes that req.user has been set to a JWT object. See IJwtPayload interface
 * @param logger A GLogger instance
 * @param trxModule the transaction module e.g. DWP
 * @param trxName the transaction name e.g. HRP
 * @param filename the filename. In Node.js can use __filename (if not webpacked)
 * @param passErrorToNext whether to pass the error to the next middleware function. Defaults to false. If set to false, this should be the last middleware
 */
export declare function responseErrorLoggerFactory(logger: GLogger, trxModule: string, trxName: string, filename?: string, passErrorToNext?: boolean): (err: Error, req: IExpressRequest, res: IExpressResponse, next: express.NextFunction) => void;
/**
 * Factory to create a success logger express middleware.
 * Assumes that req.user has been set to a JWT object. See IJwtPayload interface
 * @param logger A GLogger instance
 * @param trxModule the transaction module e.g. DWP
 * @param trxName the transaction name e.g. HRP
 * @param filename the filename. In Node.js can use __filename (if not webpacked)
 */
export declare function responseSuccessLoggerFactory(logger: GLogger, trxModule: string, trxName: string, filename?: string): (req: IExpressRequest, res: IExpressResponse, next: express.NextFunction) => void;

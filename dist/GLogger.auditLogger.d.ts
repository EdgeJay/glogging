import { GLogger, IReqRes, ITransactionMetadata, IReq, IHTTPTransactionMetadata } from '.';
export declare class GLoggerAuditLogger {
    private glogger;
    constructor(glogger: GLogger);
    logHttpSuccess(message: string, { req, res }: IReqRes, { trxName, trxModule, filename }: IHTTPTransactionMetadata): this;
    logHttpFailure(error: Error, { req, res }: IReqRes, { trxName, trxModule, filename }: IHTTPTransactionMetadata): this;
    logTransactionSuccess(message: string, { req }: IReq, { trxCategory, trxName, trxModule, filename }: ITransactionMetadata, trxStartTimeInEpochMillis: number, result?: Record<string, any>): this;
    logTransactionFailure({ req }: IReq, { trxCategory, trxName, trxModule, filename }: ITransactionMetadata, trxStartTimeInEpochMillis: number, error: Error | string | unknown): this;
}

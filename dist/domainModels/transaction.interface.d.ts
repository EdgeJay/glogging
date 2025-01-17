export declare enum TransactionCategory {
    AUTH = "AUTH",
    TRANS = "TRANS",
    HTTP = "HTTP"
}
export declare enum TransactionStatus {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}
export interface ITransactionLoggingOptions {
    toLogResults: boolean;
    redactedProperties?: Array<string | number | symbol>;
}
export interface ITransactionMetadata {
    trxCategory: TransactionCategory;
    trxModule: string;
    trxName: string;
    filename?: string;
}
export interface IHTTPTransactionMetadata {
    trxModule: string;
    trxName: string;
    filename?: string;
}
export interface IDecoratorMetadata {
    trxCategory: TransactionCategory;
    trxModule: string;
    filename?: string;
}

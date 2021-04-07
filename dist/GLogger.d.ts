import * as Transport from 'winston-transport';
import { IConfigs } from './domainModels/GLogger.interface';
/**
 * How to use this class:
 * Initialize a new instance in your codebase. Use this instance as a singleton through the codebase.
 * if loggingMode is not provided, defaults to LoggingMode.PRODUCTION
 */
export declare class GLogger {
    private logger;
    private verboseMode;
    private loggingMode;
    constructor(inputConfigs: Partial<IConfigs>);
    toggleVerboseModeOn(): void;
    /**
     * Add a winston transport to this LogUtil instance
     * @param transport a winston-transport Log Transport instance
     */
    addLogTransport(transport: Transport): this;
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
    debug(message: string, data?: Record<string, any>): GLogger;
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
    info(message: string, data?: Record<string, any>): GLogger;
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
    warn(message: string, error?: Error, data?: Record<string, any>): GLogger;
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
    error(message: string, error?: Error, data?: Record<string, any>): GLogger;
}

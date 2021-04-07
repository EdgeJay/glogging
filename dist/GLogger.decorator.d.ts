import { GLogger, IExpressRequest, ITransactionLoggingOptions } from '.';
import { IDecoratorMetadata } from './domainModels';
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
export declare function LoggedClass(logger: GLogger, metadata: IDecoratorMetadata, options?: ITransactionLoggingOptions): ClassDecorator;
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
export declare function LoggedMethod(logger: GLogger, metadata: IDecoratorMetadata, options?: ITransactionLoggingOptions): MethodDecorator;
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
export declare function LoggedFunction(logger: GLogger, metadata: IDecoratorMetadata, options?: ITransactionLoggingOptions): <U extends unknown[], V>(decoratedFunc: (req: IExpressRequest, ...args: U) => V, req: IExpressRequest, ...args: U) => V | Promise<unknown>;

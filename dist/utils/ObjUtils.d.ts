export declare function traverseObject(obj: Record<string | number | symbol, any>, callback: (key: string, value: any) => any): Record<string | number | symbol, any>;
/**
 * Remove from obj, all properties list redactedProperties.
 * Recursively remove from nested properties as well
 * @param redactedProperties
 * @param clonedObj
 */
export declare function redactProperties<T extends Record<string | number | symbol, any>>(redactedProperties: Array<string | number | symbol>, obj: T): T;

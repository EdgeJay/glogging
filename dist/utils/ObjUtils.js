"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redactProperties = exports.traverseObject = void 0;
var lodash_1 = __importDefault(require("lodash"));
function traverseObject(obj, callback) {
    if (!obj) {
        return obj;
    }
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'object') {
            obj[key] = traverseObject(obj[key], callback);
        }
        else {
            obj[key] = callback(key, obj[key]);
        }
    });
    return obj;
}
exports.traverseObject = traverseObject;
/**
 * Remove from obj, all properties list redactedProperties.
 * Recursively remove from nested properties as well
 * @param redactedProperties
 * @param clonedObj
 */
function redactProperties(redactedProperties, obj) {
    var clonedObj = lodash_1.default.clone(obj);
    if (!redactedProperties || redactProperties.length === 0 || !obj) {
        return clonedObj;
    }
    if (Array.isArray(clonedObj)) {
        clonedObj.forEach(function (_value, index) {
            if (redactedProperties.includes(index)) {
                clonedObj.splice(index, 1);
            }
            if (typeof clonedObj[index] === 'object') {
                clonedObj[index] = redactProperties(redactedProperties, clonedObj[index]);
            }
        });
    }
    else {
        Object.keys(clonedObj).forEach(function (key) {
            if (redactedProperties.includes(key) && typeof clonedObj === 'object') {
                clonedObj[key] = '[REDACTED]';
            }
            if (typeof clonedObj[key] === 'object') {
                clonedObj[key] = redactProperties(redactedProperties, clonedObj[key]);
            }
        });
    }
    return clonedObj;
}
exports.redactProperties = redactProperties;
//# sourceMappingURL=ObjUtils.js.map
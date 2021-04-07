"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.TransactionCategory = void 0;
var TransactionCategory;
(function (TransactionCategory) {
    TransactionCategory["AUTH"] = "AUTH";
    TransactionCategory["TRANS"] = "TRANS";
    TransactionCategory["HTTP"] = "HTTP";
})(TransactionCategory = exports.TransactionCategory || (exports.TransactionCategory = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["SUCCESS"] = "SUCCESS";
    TransactionStatus["FAILURE"] = "FAILURE";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
//# sourceMappingURL=transaction.interface.js.map
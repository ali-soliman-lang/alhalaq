"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fn) => (req, res, next) => {
    return fn(req, res, next).catch(next);
};
//# sourceMappingURL=catchAsync.js.map
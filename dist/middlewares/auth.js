"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = exports.authenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envInit_1 = require("../configs/envInit");
const utils_1 = require("../utils/utils");
function authenticationMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found"
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, envInit_1.secretKey);
        req.role = payload.role; // Assign role directly to the request
        next();
    }
    catch (error) {
        (0, utils_1.loggerTimestamp)(`Authentication error: ${error}`);
        return res.status(401).json({
            success: false,
            message: "Token not valid"
        });
    }
}
exports.authenticationMiddleware = authenticationMiddleware;
function authorizationMiddleware(roles) {
    return function (req, res, next) {
        if (!roles.includes(req.role)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        next();
    };
}
exports.authorizationMiddleware = authorizationMiddleware;

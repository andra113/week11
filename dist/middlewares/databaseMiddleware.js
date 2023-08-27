"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = __importDefault(require("../configs/dbConfig"));
const utils_1 = require("../utils/utils");
const console_1 = require("console");
function databaseMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, dbConfig_1.default)();
            (0, utils_1.loggerTimestamp)("Connected to database");
            req.db = db; // Attach the database instance to the request object
            next();
        }
        catch (error) {
            (0, console_1.timeStamp)("Failed to connect to database");
            res.status(500).json({
                success: false,
                message: 'Database connection error'
            });
        }
    });
}
exports.default = databaseMiddleware;

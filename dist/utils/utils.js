"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerTimestamp = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function loggerTimestamp(message) {
    const timestamp = (0, moment_timezone_1.default)().tz('Asia/Jakarta');
    const formattedTime = timestamp.format('YYYY-MM-DD HH:mm');
    console.log(`${formattedTime} - ${message}`);
}
exports.loggerTimestamp = loggerTimestamp;

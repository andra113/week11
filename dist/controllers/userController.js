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
exports.loginUserController = exports.registerUserController = exports.getUsersController = void 0;
const user_1 = require("../services/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { secretKey } from "../middleware/jwtAuth";
function getUsersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, user_1.getAllUsers)(req.db);
            res.json({
                success: true,
                message: "Users fetched succesfully",
                data: users,
            });
        }
        catch (error) {
            res.json({});
        }
    });
}
exports.getUsersController = getUsersController;
function registerUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password, role } = req.body;
            if (!username || username.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Username cannot be empty or contain only whitespace.",
                });
            }
            const usernameExist = yield (0, user_1.getUsernameByUsername)(username, req.db);
            if (usernameExist) {
                return res.status(409).json({
                    success: false,
                    message: "Username already exist"
                });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = {
                username,
                password: hashedPassword,
                role,
            };
            yield (0, user_1.registerUser)(newUser, req.db);
            res.status(200).json({
                success: true,
                message: "Registered succesfully",
                data: {
                    username: newUser.username,
                    role: newUser.role
                }
            });
        }
        catch (error) {
        }
    });
}
exports.registerUserController = registerUserController;
function loginUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const userExist = yield (0, user_1.getUsernameByUsername)(username, req.db);
        if (!userExist) {
            return;
        }
        const passwordMatched = yield bcrypt_1.default.compare(password, userExist.password);
        if (!passwordMatched) {
            return;
        }
        const token = yield (0, user_1.loginAndReturnToken)(userExist._id, userExist.role);
    });
}
exports.loginUserController = loginUserController;

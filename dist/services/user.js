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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsernameById = exports.registerUser = exports.getAllUsers = void 0;
function getAllUsers(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCollection = db.collection("users");
        const users = yield userCollection.find().toArray();
        return users;
    });
}
exports.getAllUsers = getAllUsers;
function registerUser(newUser, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCollection = db.collection("users");
        const newUserRegistered = yield userCollection.insertOne(newUser);
        return newUserRegistered;
    });
}
exports.registerUser = registerUser;
function getUsernameById(username, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCollection = db.collection("users");
        const userResult = yield userCollection.findOne({ username: username });
        return userResult;
    });
}
exports.getUsernameById = getUsernameById;

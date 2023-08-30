import { Db, ObjectId } from "mongodb";
import { UserModel } from "../models/dataModel";
import jwt from "jsonwebtoken";
import { secretKey } from "../configs/envInit";

async function getAllUsers(db: Db) {
	const userCollection = db.collection("users");
	const users = await userCollection.find().toArray();
	return users;
}

async function registerUser(newUser: UserModel, db: Db) {
	const userCollection = db.collection("users");
	const newUserRegistered = await userCollection.insertOne(newUser);
	return newUserRegistered;
}

async function getUsernameByUsername(username: string, db: Db) {
	const userCollection = db.collection("users");
	const userResult = await userCollection.findOne({ username: username });
	return userResult;
}

async function loginAndReturnToken(id: ObjectId, role: string): Promise<string> {
    const payload = {id, role}
    const token = await jwt.sign(payload, secretKey)
    return token
}

export { getAllUsers, registerUser, getUsernameByUsername, loginAndReturnToken };

import { Db } from "mongodb";
import { UserModel } from "../models/dataModel";

async function getAllUsers(db: Db) {
    const userCollection = db.collection('users');
    const users = await userCollection.find().toArray();
    return users
}

async function registerUser(newUser: UserModel, db: Db) {
    const userCollection = db.collection('users');
    const newUserRegistered = await userCollection.insertOne(newUser);
    return newUserRegistered
}

export {getAllUsers, registerUser}
import { Db } from "mongodb";

export async function getAllUsers(db: Db) {
    const userCollection = db.collection('users');
    const users = await userCollection.find().toArray();
    return users
}
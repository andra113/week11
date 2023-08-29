import { Db, ObjectId } from "mongodb";
import { UserModel } from "../models/dataModel";

export async function getAllSchool(db: Db) {
	const schoolCollection = db.collection("school");
	const schools = await schoolCollection.find().toArray();
	return schools;
}


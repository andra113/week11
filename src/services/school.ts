import { Db, ObjectId } from "mongodb";
import { UserModel } from "../models/dataModel";

export async function getAllSchool(db: Db) {
	const schoolCollection = db.collection("schools");
	const schools = await schoolCollection.find().toArray();
	return schools;
}

export async function addSchool(newSchool: UserModel, db: Db) {
	const schoolCollection = db.collection("school");
	const newSchoolAdded = await schoolCollection.insertOne(newSchool);
	return newSchoolAdded;
}

export async function getSchoolById(id: string, db: Db) {
	const schoolCollection = db.collection("school");
	const schoolResult = await schoolCollection.findOne({ _id: new ObjectId(id) });
	return schoolResult;
}

export async function deletSchoolById(id: string, db: Db) {
	const schoolCollection = db.collection("school");
	const schoolResult = await schoolCollection.deleteOne({ _id: new ObjectId(id) });
	return schoolResult;
}
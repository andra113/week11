import { Db, ObjectId } from "mongodb";
import { SchoolModel } from "../models/dataModel";

export async function getAllSchool(db: Db) {
	const schoolCollection = db.collection("schools");
	const schools = await schoolCollection.find().toArray();
	return schools;
}

export async function addSchool(newSchool: SchoolModel, db: Db) {
	const schoolCollection = db.collection("schools");
	const newSchoolAdded = await schoolCollection.insertOne(newSchool);
	return newSchoolAdded;
}

export async function getSchoolById(id: string, db: Db) {
	const schoolCollection = db.collection("schools");
	const schoolResult = await schoolCollection.findOne({ _id: new ObjectId(id) });
	return schoolResult;
}

export async function deletSchoolById(id: string, db: Db) {
	const schoolCollection = db.collection("schools");
	const schoolResult = await schoolCollection.findOneAndDelete({ _id: new ObjectId(id) });
	return schoolResult;
}

export async function getSchoolByName(name: string, db: Db) {
	const schoolCollection = db.collection("schools");
	const schoolResult = await schoolCollection.findOne({ name: name });
	return schoolResult;
}

export async function updatetSchoolById(id: string, updateField: any, db: Db) {
	const schoolCollection = db.collection("schools");
	const setField: any = {};
	for (const key in updateField) {
		setField[key] = updateField[key];
	}
	const schoolResult = await schoolCollection.updateOne({ _id: new ObjectId(id) },
		{
			$set: setField
		});
	return schoolResult;
}
